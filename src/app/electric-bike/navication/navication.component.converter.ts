import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Division } from 'src/app/network/model/division.model';
import { CommitteesNavicationModel } from './navication.component.model';

export class CommitteesNavicationConverter
  implements IConverter<Division, CommitteesNavicationModel<Division>>
{
  Convert(
    source: Division,
    ...res: any[]
  ): CommitteesNavicationModel<Division> {
    let model = new CommitteesNavicationModel();
    model.data = source;
    model.id = source.Id;
    model.name = source.Name;
    return model;
  }
}
