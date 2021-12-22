import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserConfigType } from 'src/app/enum/user-config-type.enum';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';
import { VideoModel } from './video.model';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.less'],
})
export class VideoPlayerComponent implements OnDestroy, OnInit, AfterViewInit {
  @Input()
  url?: string;

  @Input()
  model?: VideoModel;

  @Input()
  webUrl: string = '/video/wsplayer/wsplayer.html';

  @Input()
  name: string = '';

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
    if (!this.iframe || !this.iframe.nativeElement.src) return undefined;
    if (!this._player) {
      this._player = new WSPlayerProxy(this.iframe.nativeElement);
    }
    return this._player;
  }

  constructor(
    private sanitizer: DomSanitizer,
    private local: LocalStorageService,
    private userService: UserRequestService
  ) {}
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    if (this.model) {
      this.url = this.model.toString();
    }

    if (this.url) {
      let src = this.getSrc(this.webUrl, this.url, this.name);
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    }
  }

  onLoad(event: Event) {
    this.loadRuleState().then(() => {
      this.eventRegist();
    });
  }

  ngOnDestroy(): void {
    if (this.registHandle) {
      clearTimeout(this.registHandle);
    }
  }

  playing = false;

  _ruleState: boolean = false;
  async loadRuleState() {
    try {
      const strRule = await this.userService.config.get(
        this.local.user.Id,
        UserConfigType.VideoRuleState
      );
      if (strRule) {
        this._ruleState = JSON.parse(strRule);
      }
    } catch (ex) {
      console.log('getRuleState error');
    }
  }
  async saveRuleState(state: boolean) {
    const fault = await this.userService.config.update(
      this.local.user.Id,
      UserConfigType.VideoRuleState,
      state.toString()
    );
    if (fault && fault.FaultCode === 0) {
      this._ruleState = state;
    }
  }

  registHandle?: NodeJS.Timer;

  eventRegist() {
    this.registHandle = setTimeout(() => {
      if (this.player) {
        this.player.getPosition = (val: any) => {
          if (val >= 1) {
            this.playing = false;
          }
        };
        this.player.onPlaying = () => {
          setTimeout(() => {
            if (this._ruleState !== undefined && this.player) {
              this.player.changeRuleState(this._ruleState);
            }
          }, 1000);
        };
        this.player.onRuleStateChanged = (state: boolean) => {
          this.saveRuleState(state);
        };
      } else {
        this.eventRegist();
      }
    }, 100);
  }
}
