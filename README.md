# Enkerip
Enkerip is a simple and light-weight JavaScript Crypto library that uses 'aes-256-cbc' algorithm.

## Installing
Installing enkerip is as easy as running the following. Do make sure you have either npm or yarn installed, though.
```
  // using yarn
  yarn add enkerip

  // using npm
  npm i enkerip
```

## How to Use
Enkerip is easy to use. Just create an instance of enkerip and start encrypting or decrypting.
```js
  const Enkerip = require('enkerip');

  const enkerip = new Enkerip({
    secret1: 'your_first_secret',
    secret2: 'your_second_secret',
    padLength: 'max_length_of_the_encrypted_string_that_you_want',
  });
```

After that, you can start encrypting or decrypting by using the `encrypt` or `decrypt` method of enkerip's instance.
```js
  // encrypt the string 'Hello, world'
  const encrypted = enkerip.encrypt('Hello, world');

  // decrypt the encrypted string
  const decrypted = enkerip.decrypt(encrypted);  // returns 'Hello, world'
```

## License
[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
