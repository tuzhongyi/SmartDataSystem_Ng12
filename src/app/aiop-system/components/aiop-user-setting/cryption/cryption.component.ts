import { Component, OnInit } from '@angular/core';
import CryptoJS from 'crypto-js';
import { CryptionTool } from 'src/app/common/tools/cryptions/cryption.tool';

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

  encode1() {
    this.result1 = CryptionTool.sm4.encrypt(this.key, this.iv, this.text);
  }

  encode2() {
    let key = CryptoJS.enc.Utf8.parse(this.key);
    let iv = CryptoJS.enc.Hex.parse(this.iv);
    let text = CryptoJS.enc.Utf8.parse(this.text);
    let encrypted = CryptoJS.DES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    this.result2 = encrypted.toString();
  }
}
