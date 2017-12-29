export interface OppLocation {
  name?: string;
  id?: number;
}
export interface Industry {
  name?: string;
  category?: string;
  id?: number;
}
export interface Params {
  location?: OppLocation;
  industry?: Industry;
  keyword?: string;
  pageNum?: number;
  itemsPerPage?: number;
  scrollTop?: number;
  industryId?: number;
  locationId?: number;
}
