export class ListItem<T> {
  constructor(id: string, name: string, type: ListItemType, data: T) {
    this.Id = id;
    this.Name = name;
    this.type = type;
    this.Data = data;
  }
  Id: string;
  Name: string;
  type: ListItemType;
  Data: T;
}

export enum ListItemType {
  Parent,
  Division,
  GarbageStation,
}
