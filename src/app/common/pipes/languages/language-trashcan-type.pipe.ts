import { Pipe, PipeTransform } from '@angular/core';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { Language } from '../../tools/language';

@Pipe({
  name: 'language_trashcan_type_pipe',
})
export class LanguageTrashCanType implements PipeTransform {
  transform(value?: TrashCanType, ...args: unknown[]): string {
    return Language.TrashCanType(value);
  }
}
