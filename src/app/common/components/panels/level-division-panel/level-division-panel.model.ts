import { IBusiness, IGet } from 'src/app/common/interfaces/bussiness.interface';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { ILevelListNode } from '../level-list-panel/level-list-panel.model';

export type ILevelDivisionPanelBusiness = IBusiness<
  Division[],
  ILevelListNode[]
> &
  IGet<Division>;

export interface ILevelDivisionPanelComponent {
  business: ILevelDivisionPanelBusiness;
}
