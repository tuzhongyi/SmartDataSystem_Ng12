import { ColorClassTool } from './color-class.tool';
import { ColorStyleTool } from './color-style.tool';

export class ColorTool {
  static class = new ColorClassTool();
  static style = new ColorStyleTool();
}
