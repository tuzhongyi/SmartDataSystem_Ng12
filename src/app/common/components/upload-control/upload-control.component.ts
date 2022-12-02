import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FileReadType, FileResult } from './upload-control.model';

@Component({
  selector: 'upload-control',
  templateUrl: './upload-control.component.html',
  styleUrls: ['./upload-control.component.less'],
})
export class UploadControlComponent implements OnInit {
  @Input()
  accept: string = '*.png|*.jpg|*.jpeg|*.bmp';

  @Input()
  type: FileReadType = FileReadType.DataURL;
  @Input()
  encoding?: string;

  @Output()
  upload: EventEmitter<FileResult> = new EventEmitter();

  constructor() {}
  @ViewChild('file')
  file?: ElementRef;
  ngOnInit(): void {}
  onupload() {
    if (this.file) {
      this.file.nativeElement.click();
    }
  }
  fileChange() {
    if (this.file) {
      const t_files = this.file.nativeElement.files;
      if (t_files.length > 0) {
        this.uploadFile(t_files[0]);
        this.file.nativeElement.value = null;
      }
    }
  }
  async uploadFile(file: any) {
    var reader = new FileReader();
    switch (this.type) {
      case FileReadType.ArrayBuffer:
        reader.readAsArrayBuffer(file);
        break;
      case FileReadType.BinaryString:
        reader.readAsBinaryString(file);
        break;
      case FileReadType.DataURL:
        reader.readAsDataURL(file);
        break;
      case FileReadType.Text:
        reader.readAsText(file, this.encoding);
        break;

      default:
        break;
    }

    reader.addEventListener('loadend', () => {
      this.upload.emit(reader.result);
    });
  }
}
