const sm4 = require('sm-crypto').sm4

export function sm4encrypt (key, iv, text) {

  return sm4.encrypt(text, key, { mode: 'cbc', iv: iv, padding: "pkcs#7" }) // 加密，cbc 模式
}