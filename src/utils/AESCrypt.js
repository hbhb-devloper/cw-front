import CryptoJS from 'crypto-js/crypto-js'

// 密钥key
const KEY = CryptoJS.enc.Utf8.parse('1234567890ABCDEF1234567890ABCDEF');
// 偏移量
const IV = CryptoJS.enc.Utf8.parse('0123456789ABCDEF');

/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function Encrypt(word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

/**
 * AES 解密 ：字符串 key iv  返回base64
 */
export function Decrypt(word) {
  let base64 = CryptoJS.enc.Base64.parse(word);
  let src = CryptoJS.enc.Base64.stringify(base64);

  const decrypt = CryptoJS.AES.decrypt(src, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });

  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
