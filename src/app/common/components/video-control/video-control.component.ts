import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-control',
  templateUrl: './video-control.component.html',
  styleUrls: ['./video-control.component.less'],
})
export class VideoControlComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit
{
  @Input()
  url?: string;

  src: any;

  getSrc(webUrl: string, url: string, cameraName?: string) {
    let result = webUrl + '?url=' + base64encode(url);
    if (cameraName) {
      let name = utf16to8(cameraName);
      result += '&name=' + base64encode(name);
    }
    return result;
  }

  @ViewChild('iframe')
  iframe!: ElementRef;

  private _player?: WSPlayerProxy;
  private get player(): WSPlayerProxy | undefined {
    console.log('get player');
    if (!this.iframe || !this.iframe.nativeElement.src) return undefined;
    if (!this._player) {
      this._player = new WSPlayerProxy(this.iframe.nativeElement);
    }
    return this._player;
  }

  constructor(private sanitizer: DomSanitizer) {}
  ngAfterViewInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.url) {
      let src = this.getSrc('/video/wsplayer/wsplayer.html', this.url!, '测试');
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    }
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {
    // (this.iframe.nativeElement as HTMLIFrameElement).src = this.url!;
  }
}
