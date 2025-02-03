export type Params = {
  [param: string]: string | string[] | undefined;
};

export type SearchParams = {
  [param: string]: string | string[] | undefined;
};

export type PageProps = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};

export type ErrorMessageProps = {
  message: string;
  code?: string;
  handler?: () => void;
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
  SUPERADMIN = "superadmin",
  TENANT = "tenant",
  ADMIN = "admin",
}

export type Response = {
  data: Record<string, string>;
};

export type LayoutProps = {
  params: Promise<Params>;
  children: React.ReactElement;
};
