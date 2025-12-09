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

export type TProduct = {
  id: string;
  name: string;
  price: number;
  sku: string;
  quantity: number;
  lowStockAt: number;
};

export type TProductRequest = Omit<TProduct, "id">;

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
  product = "/api/product",
}

export type ApiResponse<T> = {
  status: HttpStatus;
  message: string;
  data: T;
};

export enum Modals {
  deleteModal = "delete_modal",
  editModal = "edit_modal",
}

export type TPayloadUpdate = {
  id: string;
  quantity: number;
  type: "sell" | "buy";
};

export type TSoftDelete = {
  isDeleted: true;
  id: string;
};

export type TSold = {
  quantity: number;
  soldQuantity: number;
  id: string;
};

export type TBought = {
  quantity: number;
  boughtQuantity: number;
  id: string;
};
