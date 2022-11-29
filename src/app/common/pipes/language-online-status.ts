import { Pipe, PipeTransform } from '@angular/core';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Language } from '../tools/language';

@Pipe({
  name: 'language_online_status_pipe',
})
export class LanguageOnlineStatus implements PipeTransform {
  transform(value?: OnlineStatus, ...args: unknown[]): string {
    return Language.OnlineStatus(value);
  }
}
