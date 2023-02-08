import { IBusiness, IGet } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { Division } from 'src/app/network/model/division.model';
import { ILevelListNode } from '../level-list-panel/level-list-panel.model';

export type ILevelDivisionPanelBusiness = IBusiness<
  Division[],
  ILevelListNode[]
> &
  IGet<Division>;

export interface ILevelDivisionPanelComponent {
  business: ILevelDivisionPanelBusiness;
}
