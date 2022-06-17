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
   * @returns A promise with hashed password (incase of encryption) or a success message (incase of decryption)
   */
  transformPassword(pwd: string, action: string): Promise<any> {
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
   * @returns A credential obj/empty string inside of a promise
   */
  async findCredential(username: string): Promise<any> {
    const credential = await this.userCredentialsModel.findOne({
      username: username,
      active_status: true,
    });
    if (!credential) {
      return '';
    }
    return credential;
  }

  async createJWTToken(userCred: any): Promise<any> {
    // Impementation in progress
  }

  /**
   * Register new users
   * @param credentials A credential object with username, user_reg_id and password
   * @returns An object with status and success/error message inside a promise
   */
  async registerCredentials(credentials: any): Promise<any> {
    const userCred = await this.findCredential(credentials.username);
    if (userCred !== '') {
      throw new HttpException(
        {
          status: 200,
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
        status: 500,
        message: 'Something went wrong while inserting user credentials in Db.',
        ok: false,
      });
    }
    return {
      status: 200,
      message: 'User credentials inserted successfully!',
      ok: true,
    };
  }

  /**
   * Sign in user with credentials
   * @param userCred An object with username and password
   * @returns An object with appropriate message/data inside a promise
   */
  async signInUser(userCred: any): Promise<any> {
    const credObjFromDb = await this.findCredential(userCred.username);
    if (credObjFromDb === '') {
      throw new NotFoundException({
        status: 404,
        ok: false,
        message: 'User does not exists.',
      });
    }
    const isUserAuthentic = await this.transformPassword(
      credObjFromDb.password + '<divide>' + userCred.password,
      'Decrypt',
    );
    if (!isUserAuthentic) {
      throw new UnauthorizedException({
        status: 401,
        message:
          'User is either entering wrong password or unauthorized! Please connect with the administrator',
        ok: false,
      });
    }
    // to return a JWT token
    return { status: 200, message: 'User is authorized', ok: true };
  }
}
