import { Injectable } from '@angular/core';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { ILevelDivisionNode } from './level-division-panel.model';

@Injectable()
export class LevelDivisionPanelConverter {
  Convert(source: Division[], ...res: any[]): ILevelDivisionNode[] {
    return source;
  }
}
