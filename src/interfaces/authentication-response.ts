export interface IAuthenticationResponse {
  username: string;
  roles: string[];
  tokenDetails: {
    idToken: string;
    refreshToken: string;
    validTill: Date;
  };
}
