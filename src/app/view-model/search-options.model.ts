export interface SearchOptions {
  text: string;
  propertyName: SearchOptionKey;
}
export enum SearchOptionKey {
  name = 'Name',
  community = 'CommunityName',
}
