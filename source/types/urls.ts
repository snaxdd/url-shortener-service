export interface ShortUrl {
  id: number;
  url: string;
  short_url: string;
  clicks: number | null;
  created_at: string;
  updated_at: string;
}
