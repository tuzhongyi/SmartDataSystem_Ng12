export class Sm4Util {


  static {
      Security.addProvider(new BouncyCastleProvider());
  }

  private static  ENCODING = "UTF-8";

  private static  ALGORITHM_NAME = "SM4";

  /**
   * PKCS5Padding  NoPadding 补位规则，PKCS5Padding缺位补0，NoPadding不补
   */
  private static  ALGORITHM_NAME_ECB_PADDING = "SM4/ECB/PKCS5Padding";

  /**
   * ECB加密模式，无向量
   * @param algorithmName 算法名称
   * @param mode          模式
   * @param key           key
   * @return 结果
   */
  private static generateEcbCipher(algorithmName:string, mode:number, key:number)  {
      let cipher = Cipher.getInstance(algorithmName, BouncyCastleProvider.PROVIDER_NAME);
      let sm4Key = new SecretKeySpec(key, this.ALGORITHM_NAME);
      cipher.init(mode, sm4Key);
      return cipher;
  }

  /**
   * sm4加密
   * 加密模式：ECB 密文长度不固定，会随着被加密字符串长度的变化而变化
   *
   * @param hexKey   16进制密钥（忽略大小写）
   * @param plainText 待加密字符串
   * @return 返回16进制的加密字符串
   * @since 0.0.5
   */
  public static String encryptEcb(String hexKey, String plainText) {
      try {
          String cipherText = "";
          // 16进制字符串-->byte[]
          byte[] keyData = ByteUtils.fromHexString(hexKey);
          // String-->byte[]
          //当加密数据为16进制字符串时使用这行
          byte[] srcData = plainText.getBytes(ENCODING);
          // 加密后的数组
          byte[] cipherArray = encryptEcbPadding(keyData, srcData);
          // byte[]-->hexString
          cipherText = ByteUtils.toHexString(cipherArray);
          return cipherText;
      } catch (Exception exception) {
          throw new SecretRuntimeException(exception);
      }
  }

  /**
   * 加密模式之Ecb
   *
   * @param key 秘钥
   * @param data 待加密的数据
   * @return 字节数组
   * @since 0.0.5
   */
  public static byte[] encryptEcbPadding(byte[] key, byte[] data) {
      try {
          //声称Ecb暗号,通过第二个参数判断加密还是解密
          Cipher cipher = generateEcbCipher(ALGORITHM_NAME_ECB_PADDING, Cipher.ENCRYPT_MODE, key);
          return cipher.doFinal(data);
      } catch (Exception exception) {
          throw new SecretRuntimeException(exception);
      }
  }

  //解密****************************************

  /**
   * sm4解密
   *
   * 解密模式：采用ECB
   * @param hexKey     16进制密钥
   * @param cipherText 16进制的加密字符串（忽略大小写）
   * @return 解密后的字符串
   * @since 0.0.5
   */
  public static String decryptEcb(String hexKey, String cipherText) {
      try {
          // 用于接收解密后的字符串
          String decryptStr = "";
          // hexString-->byte[]
          byte[] keyData = ByteUtils.fromHexString(hexKey);
          // hexString-->byte[]
          byte[] cipherData = ByteUtils.fromHexString(cipherText);
          // 解密
          byte[] srcData = decryptEcbPadding(keyData, cipherData);
          // byte[]-->String
          decryptStr = new String(srcData, ENCODING);
          return decryptStr;
      } catch (Exception exception) {
          throw new SecretRuntimeException(exception);
      }
  }

  /**
   * 解密
   *
   * @param key 秘钥
   * @param cipherText 密文
   * @return 结果
   * @since 0.0.5
   */
  public static byte[] decryptEcbPadding(byte[] key, byte[] cipherText) {
      try {
          //生成Ecb暗号,通过第二个参数判断加密还是解密
          Cipher cipher = generateEcbCipher(ALGORITHM_NAME_ECB_PADDING, Cipher.DECRYPT_MODE, key);
          return cipher.doFinal(cipherText);
      } catch (Exception exception) {
          throw new SecretRuntimeException(exception);
      }
  }

  /**
   * 验证数据
   * @param hexKey key
   * @param cipherText 密文
   * @param plainText 明文
   * @return 结果
   * @since 0.0.5
   */
  public static boolean verifyEcb(String hexKey, String cipherText, String plainText) {
      try {
          // 用于接收校验结果
          boolean flag = false;
          // hexString-->byte[]
          byte[] keyData = ByteUtils.fromHexString(hexKey);
          // 将16进制字符串转换成数组
          byte[] cipherData = ByteUtils.fromHexString(cipherText);
          // 解密
          byte[] decryptData = decryptEcbPadding(keyData, cipherData);
          // 将原字符串转换成byte[]
          byte[] srcData = plainText.getBytes(ENCODING);
          // 判断2个数组是否一致
          flag = Arrays.equals(decryptData, srcData);
          return flag;
      } catch (Exception exception) {
          throw new SecretRuntimeException(exception);
      }
  }

}