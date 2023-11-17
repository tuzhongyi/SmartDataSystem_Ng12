import { sm4encrypt } from './sm4';

export class CryptionSM4Tool {
  encrypt(key: string, iv: string, text: string) {
    let _key: any = this.tohex(key).join('');
    let _iv: any = this.tohex(iv).join('');
    let result_hex = sm4encrypt(_key, _iv, text);
    let array = this.stringToArray(result_hex);
    let result = this.fromhex(array);
    return base64encode(result);
  }

  private tohex(str: string) {
    let val = [];
    for (let i = 0; i < str.length; i++) {
      val.push(str.charCodeAt(i).toString(16));
    }
    return val;
  }
  private fromhex(array: Array<string | number>) {
    let val = '';
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      let num: number;
      if (typeof item === 'string') {
        num = parseInt(item, 16);
      } else {
        num = item;
      }
      val += String.fromCharCode(num);
    }
    return val;
  }
  private stringToArray(str: string) {
    let array = [];

    for (let i = 0; i < str.length; i += 2) {
      array.push(str.substring(i, i + 2));
    }
    return array;
  }
}
