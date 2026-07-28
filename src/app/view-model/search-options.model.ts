export interface ISearchOptions {
  text: string;
  key: SearchOptionKey;
}
export class SearchOption implements ISearchOptions {
  text = '';
  key = SearchOptionKey.name;
}
export enum SearchOptionKey {
  name = 'Name',
  community = 'CommunityName'
}
