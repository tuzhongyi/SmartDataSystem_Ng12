export interface IConverter<T, R> {
  Convert(source: T, ...res: any[]): R;
}

export interface IPromiseConverter<T, R> {
  Convert(source: T, ...res: any[]): Promise<R>;
}
