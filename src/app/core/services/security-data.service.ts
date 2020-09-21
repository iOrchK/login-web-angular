import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class SecurityDataService {
  private secret: string;

  constructor() {
    this.secret = environment.secret;
  }

  public CipherText(text: string): string {
    try {
      return CryptoJS.AES.encrypt(text, environment.secret).toString();
    } catch (error) {
      console.error(error);
      return text;
    }
  }

  public DecipherText(ciphertext: string): string {
    try {
      return CryptoJS.AES.decrypt(ciphertext, this.secret).toString(
        CryptoJS.enc.Utf8
      );
    } catch (error) {
      console.error(error);
      return ciphertext;
    }
  }
}
