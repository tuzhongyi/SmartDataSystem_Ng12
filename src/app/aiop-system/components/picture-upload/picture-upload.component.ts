import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'picture-upload',
  templateUrl: './picture-upload.component.html',
  styleUrls: ['./picture-upload.component.less'],
})
export class PictureUploadComponent {
  @Input() imageUrl: string = '';

  @Input() accept: string = '*.png|*.jpg|*.jpeg|*.bmp';

  @Output() loaded = new EventEmitter<string | ArrayBuffer | null>();

  trigger(input: HTMLInputElement) {
    input.click();
  }

  onChange(input: HTMLInputElement) {
    if (input.files && input.files.length > 0) {
      let file = input.files.item(0)!;
      this.uploadFile(file);
    }
  }
  uploadFile(file: File) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.imageUrl = fileReader.result as string;

      this.loaded.emit(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }
}
