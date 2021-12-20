export class SelectItem {
  constructor(opts?: { key: string; value: any; language?: string }) {
    if (opts) {
      this.key = opts.key;
      this.value = opts.value;
      this.language = opts.language ?? '';
    }
  }
  key: string = '';
  value!: any;
  language!: string;
}
