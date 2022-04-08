export class SelectItem {
  constructor(key?: string, value?: any, language?: string) {
    this.key = key ?? "";
    this.value = value ?? undefined;
    this.language = language ?? '';
  }
  key: string = '';
  value!: any;
  language!: string;
}
