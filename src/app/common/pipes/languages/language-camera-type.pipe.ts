import { Pipe, PipeTransform } from '@angular/core';
import { CameraType } from 'src/app/enum/camera-type.enum';
import { Language } from '../../tools/language';

@Pipe({
  name: 'language_camera_type_pipe',
})
export class LanguageCameraTypePipe implements PipeTransform {
  transform(value: CameraType, ...args: unknown[]): string {
    return Language.CameraType(value);
  }
}
