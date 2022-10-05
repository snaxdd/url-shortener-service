export interface ShortUrl {
  id: number;
  url: string;
  short_url: string;
  clicks: number | null;
  created_at: string;
  updated_at: string;
}

export interface IPaginatorInfo {
  count?: number;
  currentPage?: number;
  firstItem?: number;
  hasMorePages?: boolean;
  lastItem?: number;
  lastPage?: number;
  perPage?: number;
  total?: number;
}
