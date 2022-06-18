import { IUserCredentials } from 'src/credentials-management/model/credentials-management.model';
import { IStatusMessages } from 'src/shared/interfaces/status-messages';

export const errorHandlingUserCredentialObj: IUserCredentials = {
  _id: '',
  username: '',
  user_reg_id: '',
  password: '',
  active_status: false,
  addedOn: new Date(),
};

export const dbOperationUnexpectedErrorObj: IStatusMessages = {
  statusCode: 500,
  message: 'Something went wrong while inserting user credentials in Db.',
  ok: false,
};
