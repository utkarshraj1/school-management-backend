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
import { errorHandlingUserCredentialObj } from 'src/constants/error-constants';
import { IAuthenticationResponse } from 'src/interfaces/authentication-response';
import { IStatusMessages } from 'src/interfaces/status-messages';
import { CreateCredentialsDto } from './dto/create-credentials.dto';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import {
  IUserCredentials,
  USER_CREDENTIALS_NAME,
} from './model/credentials-management.model';

@Injectable()
export class CredentialsManagementService {
  constructor(
    @InjectModel(USER_CREDENTIALS_NAME)
    private readonly userCredentialsModel: Model<IUserCredentials>,
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
            if (!verified) {
              resolve(false);
            } else {
              resolve(true);
            }
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
   * Creates a JWT token
   * @param userCred An obj of type IUserCredentials
   * @returns An object of type IAuthenticationResponse inside a promise
   */
  async createJWTToken(
    userCred: IUserCredentials,
  ): Promise<IAuthenticationResponse> {
    // Impementation in progress
    return {
      username: '',
      roles: [''],
      tokenDetails: {
        idToken: '',
        refreshToken: '',
        validTill: new Date(),
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
    const userCred = await this.findCredential(credentials.username);
    if (userCred['_id'] !== '') {
      throw new HttpException(
        {
          statusCode: 200,
          ok: false,
          message: 'User credentials are already present.',
        },
        200,
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
      throw new InternalServerErrorException({
        statusCode: 500,
        message: 'Something went wrong while inserting user credentials in Db.',
        ok: false,
      });
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
    // to return a JWT token
    return this.createJWTToken(credObjFromDb);
  }
}
