import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Division } from 'src/app/network/model/division.model';

export class EventRecordSmokeWindowDivisionListConverter
  implements IConverter<Division[], SelectItem[]>
{
  Convert(source: Division[], ...res: any[]): SelectItem[] {
    return source.map((x) => {
      return new SelectItem(x.Id, x, x.Name);
    });
  }
}
