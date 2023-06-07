import { Pipe, PipeTransform } from '@angular/core';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';

@Pipe({
  name: 'can_type_color_pipe',
})
export class CanTypeColorPipe implements PipeTransform {
  transform(value?: TrashCanType, ...args: unknown[]): string {
    switch (value) {
      case TrashCanType.Dry:
        return '#88beff';
      case TrashCanType.Wet:
        return '#b572fb';
      case TrashCanType.Recycle:
        return '#68e888';
      case TrashCanType.Hazard:
        return '#f06565';

      default:
        return '';
    }
  }
}
