import { Injectable } from '@angular/core';
import { TrashCan } from 'src/app/network/model/garbage-station/trash-can.model';

@Injectable()
export class AuditListStationGarbageManagerTrashcanItemBusiness {
  convert(data: TrashCan) {
    let value = this.value(data);
    return {
      value: value,
      name: 'Perfect',
      detail: {
        color: this.color(value),
        valueAnimation: true,
        offsetCenter: ['0%', '0'],
      },
    };
  }

  value(data: TrashCan) {
    let value = ((data.CurrentVolume ?? 0) / data.MaxVolume) * 100;
    return value;
  }

  color(value: number) {
    let color = value < 90 ? '#21e452' : '#ffba00';
    return color;
  }
}
