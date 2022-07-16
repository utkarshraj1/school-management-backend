export interface IAuthenticationResponse {
  username: string;
  user_basic_info: { full_name: string; gender: string };
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
