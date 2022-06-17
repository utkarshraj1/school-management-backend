import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IAuthenticationResponse } from 'src/interfaces/authentication-response';
import { IStatusMessages } from 'src/interfaces/status-messages';
import { CredentialsManagementService } from './credentials-management.service';
import { CreateCredentialsDto } from './dto/create-credentials.dto';
import { UserCredentialsDto } from './dto/user-credentials.dto';

@Controller('/credentials')
export class CredentialsManagementController {
  constructor(
    private readonly credentialsManagementService: CredentialsManagementService,
  ) {}

  /**
   * Sign in with credentials
   * @param userCredentials An object of type UserCredentialsDto
   * @returns An object of type IAuthenticationResponse inside a promise
   */
  @Post('/signIn')
  @UsePipes(ValidationPipe)
  async signIn(
    @Body() userCredentials: UserCredentialsDto,
  ): Promise<IAuthenticationResponse> {
    return this.credentialsManagementService.signInUser(userCredentials);
  }

  /**
   * Adds new user
   * @param credentials An object of type CreateCredentialsDto
   * @returns An object of type IStatusMessages inside a promise
   */
  @Post('/signUp')
  @UsePipes(ValidationPipe)
  async signUp(
    @Body() credentials: CreateCredentialsDto,
  ): Promise<IStatusMessages> {
    return this.credentialsManagementService.registerCredentials(credentials);
  }
}
