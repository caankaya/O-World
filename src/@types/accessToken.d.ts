export interface IToken {
  data: Data;
  iat: number;
  exp: number;
}

export interface Data {
  ip: string;
  id: string;
  username: string;
  roles: string | string[];
  permissions: string[];
}
