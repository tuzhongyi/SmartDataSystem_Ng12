import { CryptionSM4Tool } from './sm4/cryption-sm4.tool';

export class CryptionTool {
  static sm4 = new CryptionSM4Tool();
}
