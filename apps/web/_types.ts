export type Params = {
  [param: string]: string | string[] | undefined;
};

export type SearchParams = {
  [param: string]: string | string[] | undefined;
};

export type PageProps = {
  params: Params;
  searchParams: SearchParams;
};

export type ErrorMessageProps = {
  message: string;
  code?: string;
};

export type PagedResponse<T> = {
  result: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ServerResponse<T> = {
  data?: T;
  error?: ErrorMessageProps;
  message: string;
};

export enum ROLES {
  SUPERADMIN = "SuperAdmin",
  TENANT = "Tenant",
}

export type Response = {
  data: Record<string, string>;
};

export type LayoutProps = { params: Params; children: React.ReactElement };
