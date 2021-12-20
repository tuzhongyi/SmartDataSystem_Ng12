export interface IConverter<T, R> {
  Convert(input: T, ...args: any[]): R;
}
