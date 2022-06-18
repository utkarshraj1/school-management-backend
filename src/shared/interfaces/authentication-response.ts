export interface IAuthenticationResponse {
  username: string;
  ok: boolean;
  roles: string[];
  user_reg_id: string;
  tokenDetails: {
    idToken: string;
    refreshToken: string;
    validTill: number;
    desc: string;
  };
}
