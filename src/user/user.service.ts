import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { dbOperationUnexpectedErrorObj } from 'src/shared/constants/error-constants';
import { CreateUserDto } from './dto/create-user.dto';
import {
  IBackgroundDetails,
  IIdentificationDetails,
  IUsers,
  SCHEMA_NAMES,
} from './model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(SCHEMA_NAMES.USERS) private readonly usersModel: Model<IUsers>,
    @InjectModel(SCHEMA_NAMES.IDENTITY_DETAILS)
    private readonly identificationDetailsModel: Model<IIdentificationDetails>,
    @InjectModel(SCHEMA_NAMES.BACK_DETAILS)
    private readonly backgroundDetailsModel: Model<IBackgroundDetails>,
  ) {}

  /**
   * Finds user based on user_reg_id
   * @param user_reg_id A string
   * @returns A document obj containing userDetails inside a promise
   */
  async findUser(user_reg_id: string): Promise<IUsers | any> {
    const result = await this.usersModel.findOne({
      reg_id: user_reg_id,
    });
    if (!result) {
      return {
        _id: '',
      };
    }
    return result;
  }

  /**
   * Saves the identification details of user
   * @param identificationData An object
   * @returns A document object of identification inside a promise
   */
  async saveIdentificationDetails(identificationData: {
    identity_type: string;
    identity_number: string;
  }): Promise<IIdentificationDetails> {
    const identificationObjRet = await this.identificationDetailsModel.create({
      ...identificationData,
    });
    if (!identificationObjRet['_id']) {
      throw new InternalServerErrorException(dbOperationUnexpectedErrorObj);
    }
    return identificationObjRet;
  }

  /**
   * Saves the background details of user
   * @param bgDetails An object
   * @returns A document object of background details inside a promise
   */
  async saveBackgroundDetails(bgDetails: {
    prev_org: string;
    prev_org_address: string;
    prev_role: string;
    prev_role_desc: string;
    prev_org_exit_date: string;
  }): Promise<IBackgroundDetails> {
    const backDetailsCreatedObj = await this.backgroundDetailsModel.create({
      ...bgDetails,
    });
    if (!backDetailsCreatedObj['_id']) {
      throw new InternalServerErrorException(dbOperationUnexpectedErrorObj);
    }
    return backDetailsCreatedObj;
  }

  /**
   * Saves a single user details into the collection
   * @param userDetails An user details obj
   * @returns A document obj containing userDetails inside a promise
   */
  async saveUserDetails(userDetails: CreateUserDto): Promise<IUsers> {
    const userDataFromDb = await this.findUser(userDetails.reg_id);
    if (userDataFromDb['_id']) {
      throw new HttpException(
        {
          statusCode: 200,
          ok: false,
          message: 'User is already present.',
        },
        200,
      );
    }

    const identificationObjRet = await this.saveIdentificationDetails({
      identity_type: userDetails['identity_type'],
      identity_number: userDetails['identity_number'],
    });
    console.log('Added the Identity obj!');

    const backDetailsCreatedObj = await this.saveBackgroundDetails({
      prev_org: userDetails.prev_org,
      prev_org_address: userDetails.prev_org_address,
      prev_role: userDetails.prev_role,
      prev_role_desc: userDetails.prev_role_desc,
      prev_org_exit_date: userDetails.prev_org_exit_date,
    });
    console.log('Added the background details obj!');

    const objectForUsersCollec = {
      reg_id: userDetails['reg_id'],
      full_name: userDetails['full_name'],
      dob: userDetails.dob,
      role: userDetails.role,
      gender: userDetails.gender,
      date_of_joining: userDetails['date_of_joining'],
      mobile_num: userDetails['mobile_num'],
      email: userDetails.email,
      address: userDetails.address,
      mother_name: userDetails['mother_name'],
      father_name: userDetails['father_name'],
      identification_id: identificationObjRet._id,
      background_details_id: backDetailsCreatedObj._id,
      active_status: true,
    };
    const usersReturnedObj = await this.usersModel.create({
      ...objectForUsersCollec,
    });
    if (!usersReturnedObj['_id']) {
      throw new InternalServerErrorException(dbOperationUnexpectedErrorObj);
    }
    return usersReturnedObj;
  }

  async updateUserDetails(userDetails: any): Promise<any> {
    // Will be implemented later
    return Promise.resolve(5);
  }
}
