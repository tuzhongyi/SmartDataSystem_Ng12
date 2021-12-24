export interface IConverter<T, R> {
  Convert(source: T, ...res: any[]): R;
}
