import { Pipe, PipeTransform } from '@angular/core';
import { Gender } from 'src/app/enum/gender.enum';
import { Language } from '../../tools/language';

@Pipe({
  name: 'language_gender_pipe',
})
export class LanguageGender implements PipeTransform {
  transform(value?: Gender, ...args: unknown[]): string {
    return Language.Gender(value);
  }
}
