import { Pipe, PipeTransform } from '@angular/core';
import { CollectionMemberType } from 'src/app/enum/member-type.enum';
import { Language } from '../../tools/language';

@Pipe({
  name: 'language_collection_member_type_pipe',
})
export class LanguageCollectionMemberType implements PipeTransform {
  transform(value?: CollectionMemberType, ...args: unknown[]): string {
    return Language.CollectionMemberType(value);
  }
}
