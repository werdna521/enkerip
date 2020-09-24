// Copyright 2020 Andrew Cen

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const crypto = require('crypto');

function* hexFormatValues(buffer) {
  for (let x of buffer) {
    const hex = x.toString(16)
    yield hex.padStart(2, '0')
  }
}

function sha256(str, i) {
  let stringBuffer = '';
  const sha = crypto.createHash('sha256').update(Buffer.from(str)).digest();
  for (const hex of hexFormatValues(sha)) {
    stringBuffer += hex;
  }
  return stringBuffer.length > 32 
    ? stringBuffer.slice(0, 32) 
    : stringBuffer;
}

function encryptDecrypt(str, str2, str3, mode) {
  const key = Buffer.from(str2);
  const iv = Buffer.from (str3.slice(0, 16));
  let output = '';

  if (mode === 'encrypt') {
    const aes = crypto.createCipheriv('aes-256-cbc', key, iv);
    output = aes.update(str, 'utf8', 'base64');
    output += aes.final('base64');
  } else if (mode === 'decrypt') {
    const aes = crypto.createDecipheriv('aes-256-cbc', key, iv);
    output = aes.update(str, 'base64');
    output += aes.final();
  } else {
    output = 'Otak Udang';
  }
  return output;
}

export default class Enkerip {

  constructor({ secret1, secret2, padLength }) {
    this.secret1 = secret1;
    this.secret2 = secret2;
    this.padLength = padLength;
  }

  encrypt(str) {
    const str2 = sha256(this.secret1, this.padLength);
    const str3 = this.secret2;
    return encryptDecrypt(str, str2, str3, 'encrypt');
  }
  
  decrypt(str) {
    const str2 = sha256(this.secret1, this.padLength);
    const str3 = this.secret2;
    return encryptDecrypt(str, str2, str3, 'decrypt');
  }
}
