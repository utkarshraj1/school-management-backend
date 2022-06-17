import { Injectable } from '@nestjs/common';
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
   * Transforms the incoming password into a new hashed and salted password
   * @param pwd A password string
   * @returns A hashed password inside of a promise
   */
  transformPassword(pwd: string): Promise<any> {
    return new Promise((resolve, reject) => {
      password(pwd).hash((error, hash) => {
        if (error) {
          reject(
            'Something is not right in transformPassword method, please check',
          );
        } else {
          resolve(hash);
        }
      });
    });
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

  /**
   * Register new users
   * @param credentials A credential object with username, user_reg_id and password
   * @returns An object with status and success/error message inside a promise
   */
  async registerCredentials(credentials: any): Promise<any> {
    const userCred = await this.findCredential(credentials.username);
    if (userCred !== '') {
      // Use proper error handling
      return { status: 404, message: 'User is already present' };
    }
    const transformedPwd = await this.transformPassword(credentials.password);
    const response = await this.userCredentialsModel.create({
      ...credentials,
      password: transformedPwd,
      active_status: true,
    });
    if (!response._id) {
      // use proper error handling
      return { status: 404, message: 'Something went wrong...' };
    }
    return { status: 200, message: 'Successfully added the new user...' };
  }
}
