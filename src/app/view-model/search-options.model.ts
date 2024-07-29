export interface SearchOptions {
  text: string;
  key: SearchOptionKey;
}
export enum SearchOptionKey {
  name = 'Name',
  community = 'CommunityName',
}
