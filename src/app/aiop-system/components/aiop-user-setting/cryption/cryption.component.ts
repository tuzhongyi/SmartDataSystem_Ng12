import { Component, OnInit } from '@angular/core';
import CryptoJS from 'crypto-js';
import { sm4encrypt } from './sm4';

@Component({
  selector: 'test-cryption',
  templateUrl: './cryption.component.html',
  styleUrls: ['./cryption.component.less'],
  providers: [],
})
export class TestCryptionComponent implements OnInit {
  key: string = 'howell6592440522';
  iv: string = 'howell1234567890';
  text: string = '123456';
  result1: string = '';
  result2: string = '';
  ngOnInit(): void {}

  encode() {
    try {
      this.encode1();
    } catch (error) {}
    this.encode2();
  }

  tohex(str: string) {
    let val = [];
    for (let i = 0; i < str.length; i++) {
      val.push(parseInt(str.charCodeAt(i).toString(16)));
    }
    return val;
  }

  encode1() {
    let key = CryptoJS.enc.Utf8.parse(this.key);
    let hex = this.tohex(this.iv);

    let result = sm4encrypt(key.toString(), hex, this.text);
    this.result1 = result;
  }

  encode2() {
    let key = CryptoJS.enc.Utf8.parse(this.key);
    let iv = CryptoJS.enc.Hex.parse(this.iv);
    let text = CryptoJS.enc.Utf8.parse(this.text);
    let encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    this.result2 = encrypted.toString();
  }
}
