export type TLoginBody = {
  email: string;
  password: string;
};

export type TRegisterBody = {
  email: string;
  password: string;
  name: string;
};

export type TVerification = {
  email: string;
  code: number;
};

export type TJwtDecoded = {
  id: string;
};

export type TUser = {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password: string;
  code: number;
  isVerified: boolean;
};

export enum HttpStatus {
  ok = 200,
  created = 201,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  conflict = 409,
  internalError = 500,
}

export type NavItem = {
  title: string;
  icon: any;
  href: string;
};

export enum APIEnums {
  register = "/api/auth/register",
  verify = "/api/auth/verify",
  login = "/api/auth/login",
}

export type ApiResponse<T> = {
  status: HttpStatus;
  message: string;
  data: T;
};
