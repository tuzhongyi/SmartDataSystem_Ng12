import { DivisionTreeConverter } from 'src/app/common/components/division-tree/division-tree.converter';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';

export class GarbageVehicleCameraTreeConverter
  implements
    IConverter<DivisionTreeSource[], CommonNestNode<DivisionTreeSource>[]>
{
  item = new DivisionTreeConverter();
  Convert(
    source: DivisionTreeSource[],
    ...res: any[]
  ): CommonNestNode<DivisionTreeSource>[] {
    return source.map((x) => {
      return this.item.Convert(x);
    });
  }
}
