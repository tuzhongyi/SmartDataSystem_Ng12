import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Language } from 'src/app/common/tools/language';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { MediaImageControlPageState } from './media-image-control-page.model';

@Component({
  selector: 'media-image-control-page',
  templateUrl: './media-image-control-page.component.html',
  styleUrls: ['./media-image-control-page.component.less'],
})
export class MediaImageControlPageComponent implements OnInit {
  @Input() model?: ImageControlModel;
  @Input() imgfirst = true;
  @Input() imglast = true;
  @Input() captureing = false;
  @Output() imgnext: EventEmitter<ImageControlModel> = new EventEmitter();
  @Output() imgprev: EventEmitter<ImageControlModel> = new EventEmitter();
  @Output() play: EventEmitter<ImageControlModel> = new EventEmitter();
  @Output() videodownload: EventEmitter<ImageControlModel> = new EventEmitter();
  @Input() operation = true;
  @Input() contain = false;

  @Input() pageindex?: number;

  @Input() pagefirst?: boolean;
  @Input() pagelast?: boolean;
  @Output() pagenext: EventEmitter<ImageControlModel> = new EventEmitter();
  @Output() pageprev: EventEmitter<ImageControlModel> = new EventEmitter();

  @Input() state?: MediaImageControlPageState;

  constructor() {}

  Color = ColorTool;
  Language = Language;

  ngOnInit(): void {}

  onimgnext(args: ImageControlModel) {
    this.imgnext.emit(args);
  }
  onimgprev(args: ImageControlModel) {
    this.imgprev.emit(args);
  }
  onplay(args: ImageControlModel) {
    this.play.emit(args);
  }
  ondownload(args: ImageControlModel) {
    this.videodownload.emit(args);
  }

  onpagenext() {
    this.pagenext.emit(this.model);
  }
  onpageprev() {
    this.pageprev.emit(this.model);
  }
}
