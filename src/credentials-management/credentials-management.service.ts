import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as password from 'password-hash-and-salt';
import * as jwt from 'jsonwebtoken';
import {
  dbOperationUnexpectedErrorObj,
  errorHandlingUserCredentialObj,
} from 'src/shared/constants/error-constants';
import { JWT_SECRET_KEY } from 'src/shared/constants/constants';
import { IAuthenticationResponse } from 'src/shared/interfaces/authentication-response';
import { IStatusMessages } from 'src/shared/interfaces/status-messages';
import { CreateCredentialsDto } from './dto/create-credentials.dto';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import {
  IUserCredentials,
  USER_CREDENTIALS_NAME,
} from './model/credentials-management.model';
import { IUsers, SCHEMA_NAMES } from 'src/user/model/user.model';

@Injectable()
export class CredentialsManagementService {
  constructor(
    @InjectModel(USER_CREDENTIALS_NAME)
    private readonly userCredentialsModel: Model<IUserCredentials>,
    @InjectModel(SCHEMA_NAMES.USERS) private readonly users: Model<IUsers>,
  ) {}

  /**
   * Encrypts/Decrypts the password
   * @param pwd A password string
   * @param action The action to be taken - Encrypt/Decrypt
   * @returns A string (encryption) or a boolean (decryption) value
   */
  transformPassword(pwd: string, action: string): Promise<string | boolean> {
    switch (action) {
      case 'Encrypt':
        return new Promise((resolve, reject) => {
          password(pwd).hash((error, hash) => {
            if (error) {
              console.log(
                'Error came in transformPassword method while encrypting.',
              );
              reject('');
            } else {
              resolve(hash);
            }
          });
        });
      case 'Decrypt':
        return new Promise((resolve, reject) => {
          const [hash, enteredPwd] = pwd.split('<divide>');
          password(enteredPwd).verifyAgainst(hash, (err, verified) => {
            if (err) {
              console.log(
                'Error came in transformPassword method while decrypting.',
              );
              reject('');
            }
            resolve(verified);
          });
        });
    }
  }

  /**
   * Finds the credential based on the username
   * @param username A username string
   * @returns An obj of type IUserCredentials inside of a promise
   */
  async findCredential(username: string): Promise<IUserCredentials> {
    const credential = await this.userCredentialsModel.findOne({
      username: username,
      active_status: true,
    });
    if (!credential) {
      return errorHandlingUserCredentialObj;
    }
    return credential;
  }

  /**
   * Generates a JWT Sign
   * @param data An Obj which will be encoded in JWT
   * @param expireInData The expiry date of jwt sign
   * @returns A jwt sign
   */
  generateJWTSign(data: any, expireInData: string) {
    return jwt.sign(data, JWT_SECRET_KEY, {
      expiresIn: expireInData,
    });
  }

  /**
   * Creates a JWT token
   * @param userCred An obj of type IUserCredentials
   * @returns An object of type IAuthenticationResponse inside a promise
   */
  async createJWTToken(
    userCred: IUserCredentials,
  ): Promise<IAuthenticationResponse> {
    // the role will flow from the user collection, make sure to update it here
    const userData = await this.users.findOne({
      reg_id: userCred.user_reg_id,
    });
    const jwtEncodingData = {
      username: userCred.username,
      roles: [userData.role],
    };
    const [jsonWebToken, refreshToken] = [
      this.generateJWTSign(jwtEncodingData, '1h'),
      this.generateJWTSign(jwtEncodingData, '6h'),
    ];
    return {
      username: userCred.username,
      user_reg_id: userCred.user_reg_id,
      user_basic_info: {
        full_name: userData.full_name,
        gender: userData.gender,
      },
      ok: true,
      roles: [userData.role],
      tokenDetails: {
        idToken: jsonWebToken,
        refreshToken: refreshToken,
        validTill: Math.floor(Date.now() / 1000) + 60 * 60,
        desc: 'validTill is measured in seconds',
      },
    };
  }

  /**
   * Register new users
   * @param credentials An obj of type CreateCredentialsDto
   * @returns An object of type IStatusMessages inside a promise
   */
  async registerCredentials(
    credentials: CreateCredentialsDto,
  ): Promise<IStatusMessages> {
    const [userCred, checkCredBasedOnUserRegId] = await Promise.all([
      this.findCredential(credentials.username),
      this.userCredentialsModel.findOne({
        user_reg_id: credentials.user_reg_id,
      }),
    ]);
    const alreadyPresentErrorMessage = {
      statusCode: 200,
      ok: false,
      message: 'User credentials are already present.',
    };
    if (checkCredBasedOnUserRegId || userCred['_id'] !== '') {
      throw new HttpException(
        alreadyPresentErrorMessage,
        alreadyPresentErrorMessage.statusCode,
      );
    }

    const transformedPwd = await this.transformPassword(
      credentials.password,
      'Encrypt',
    );
    const response = await this.userCredentialsModel.create({
      ...credentials,
      password: transformedPwd,
      active_status: true,
    });
    if (!response._id) {
      throw new InternalServerErrorException(dbOperationUnexpectedErrorObj);
    }
    return {
      statusCode: 200,
      message: 'User credentials inserted successfully!',
      ok: true,
    };
  }

  /**
   * Sign in user with credentials
   * @param userCred An object of type UserCredentialsDto
   * @returns An object of type IAuthenticationResponse inside a promise
   */
  async signInUser(
    userCred: UserCredentialsDto,
  ): Promise<IAuthenticationResponse> {
    const credObjFromDb = await this.findCredential(userCred.username);
    if (credObjFromDb['_id'] === '') {
      throw new NotFoundException({
        statusCode: 404,
        ok: false,
        message: 'User does not exists.',
      });
    }
    const isUserAuthentic = await this.transformPassword(
      credObjFromDb['password'] + '<divide>' + userCred.password,
      'Decrypt',
    );
    if (!isUserAuthentic) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Either password is wrong or the user is unauthorized.',
        ok: false,
      });
    }
    // returning an obj with jwt token inside
    return this.createJWTToken(credObjFromDb);
  }
}
