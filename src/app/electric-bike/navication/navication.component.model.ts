export class CommitteesNavicationModel<T = any> {
  id: string = '';
  name: string = '';
  parent?: CommitteesNavicationModel;
  children: CommitteesNavicationModel[] = [];
  data?: T;
}
