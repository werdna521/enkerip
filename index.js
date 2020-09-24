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
  return stringBuffer.length > i 
    ? stringBuffer.slice(0, i) 
    : stringBuffer;
}

function generateKeys(keyString, ivString) {
  const key = Buffer.from(keyString);
  const iv = Buffer.from (ivString.slice(0, 16));
  return [key, iv];
}

class Enkerip {

  constructor({ secret1, secret2, padLength }) {
    this.secret1 = secret1;
    this.secret2 = secret2;
    this.padLength = padLength;
  }

  encrypt(str) {
    const str2 = sha256(this.secret1, this.padLength);
    const str3 = this.secret2;
    const [key, iv] = generateKeys(str2, str3);
    const aes = crypto.createCipheriv('aes-256-cbc', key, iv);
    return `${aes.update(str, 'utf8', 'base64')}${aes.final('base64')}`;
  }
  
  decrypt(str) {
    const str2 = sha256(this.secret1, this.padLength);
    const str3 = this.secret2;
    const [key, iv] = generateKeys(str2, str3);
    const aes = crypto.createDecipheriv('aes-256-cbc', key, iv);
    return `${aes.update(str, 'base64')}${aes.final()}`;
  }
}

module.exports = Enkerip;
