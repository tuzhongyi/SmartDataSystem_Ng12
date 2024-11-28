import { DivisionType } from 'src/app/enum/division-type.enum';
import { ILevelListNode } from '../level-list-panel/level-list-panel.model';

export interface ILevelDivisionNode extends ILevelListNode {
  DivisionType: DivisionType;
  IsParent?: boolean;
}
