export class ListItem<T> {
  constructor(
    id: string,
    name: string,
    type: ListItemType,
    data: T,
    hasChild = false
  ) {
    this.Id = id;
    this.Name = name;
    this.type = type;
    this.Data = data;
    this.hasChild = hasChild;
  }
  Id: string;
  Name: string;
  type: ListItemType;
  Data: T;

  hasChild: boolean;
}

export enum ListItemType {
  Parent,
  Division,
  GarbageStation,
}
