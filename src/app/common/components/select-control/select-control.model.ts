export class SelectItem {
  constructor(key?: string, value?: any, language?: string) {
    this.key = key ?? '';
    this.value = value ?? undefined;
    this.language = language ?? '';
  }
  key: string = '';
  value!: any;
  language!: string;

  static create<T>(t: T, language: (t: T) => string) {
    return new SelectItem((t as any).toString(), t, language(t));
  }
}
