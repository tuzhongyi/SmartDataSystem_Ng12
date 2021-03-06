export class SelectItem {
  constructor(key?: string, value?: any, language?: string) {
    this.key = key ?? '';
    this.value = value ?? undefined;
    this.language = language ?? '';
  }
  key: string = '';
  value!: any;
  language!: string;

  static create<T>(t: T, language: string | ((t: T) => string)) {
    let key = t === undefined ? '' : (t as any).toString();
    if (typeof language === 'string') {
      return new SelectItem(key, t, language);
    }
    return new SelectItem(key, t, language(t));
  }
}
