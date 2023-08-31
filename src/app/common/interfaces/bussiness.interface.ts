export interface IBusiness<IModel, IViewModel = IModel> {
  load(...args: any): Promise<IViewModel>;
  getData(...args: any): Promise<IModel>;
}

export interface ICreate<T> {
  create(...args: any[]): Promise<T>;
}
export interface IUpdate<T> {
  update(...args: any[]): Promise<T>;
}
export interface IDelete<T> {
  delete(...args: any[]): Promise<T>;
}
export interface IGet<T> {
  get(...args: any[]): Promise<T>;
}
export interface IUpload {
  upload(...args: any[]): Promise<any>;
}
export interface IDownload {
  download(...args: any[]): Promise<any>;
}
