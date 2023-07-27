import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { UserConfigType } from 'src/app/enum/user-config-type.enum';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';
import { HowellUrl } from 'src/app/view-model/howell-url.model';
import { wait } from '../../tools/tool';
import { VideoModel } from './video.model';
import { ButtonName } from './WSPlayerProxyButtonName';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.less'],
})
export class VideoPlayerComponent
  implements OnDestroy, OnInit, AfterViewInit, OnChanges
{
  @Input() url?: string;
  @Input() model?: VideoModel;
  @Input() webUrl: string;
  @Input() name: string = '';
  @Input() index = 0;
  @Input() play?: EventEmitter<VideoModel>;
  @Input() stop?: EventEmitter<void>;
  @Input() download?: EventEmitter<{ filename: string; type: string }>;
  @Input() resize?: EventEmitter<{ width: number; height: number }>;
  @Input() fullscreen?: EventEmitter<void>;
  @Input() frame?: EventEmitter<void>;
  @Input() resume?: EventEmitter<void>;
  @Input() speedResume?: EventEmitter<void>;
  @Input() pause?: EventEmitter<void>;
  @Input() capturePicture?: EventEmitter<void>;
  @Input() slow?: EventEmitter<void>;
  @Input() fast?: EventEmitter<void>;
  @Input() changeRuleState?: EventEmitter<boolean>;
  @Input() seek?: EventEmitter<number>;

  @Output() loaded: EventEmitter<void> = new EventEmitter();
  @Output() destroy: EventEmitter<VideoModel> = new EventEmitter();
  @Output() onStoping: EventEmitter<number> = new EventEmitter();
  @Output() onPlaying: EventEmitter<number> = new EventEmitter();
  @Output() getPosition: EventEmitter<number> = new EventEmitter();
  @Output() onButtonClicked: EventEmitter<ButtonName> = new EventEmitter();
  @Output() onViewerDoubleClicked: EventEmitter<number> = new EventEmitter();
  @Output() onRuleStateChanged: EventEmitter<boolean> = new EventEmitter();
  @Output() onViewerClicked: EventEmitter<number> = new EventEmitter();

  constructor(
    private sanitizer: DomSanitizer,
    private local: LocalStorageService,
    private userService: UserRequestService
  ) {
    let protocol = location.protocol;
    if (!protocol.includes(':')) {
      protocol += ':';
    }
    let port = '';
    if (location.port) {
      port = ':' + location.port;
    }
    this.webUrl = `${protocol}//${location.hostname}${port}/video/wsplayer/wsplayer.html`;
  }
  reserve: number = 15 * 1000;
  src?: SafeResourceUrl;
  isloaded = false;
  playing = false;
  stream: StreamType = StreamType.main;
  registHandle?: NodeJS.Timer;
  private _ruleState: boolean = false;
  private _player?: WSPlayerProxy;
  private get player(): WSPlayerProxy | undefined {
    if (!this.iframe || !this.iframe.nativeElement.contentWindow)
      return undefined;
    if (!this._player) {
      this._player = new WSPlayerProxy(this.iframe.nativeElement);
    }
    return this._player;
  }

  @ViewChild('iframe') iframe!: ElementRef;

  getSrc(webUrl: string, url: string, cameraName?: string) {
    let result = webUrl + '?url=' + base64encode(url);
    if (cameraName) {
      let name = utf16to8(cameraName);
      result += '&name=' + base64encode(name);
    }
    result += '&index=' + this.index;
    return result;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.model && !changes.model.firstChange) {
      this.isloaded = false;
    }
    if (changes.play && this.play) {
      this.play.subscribe((x) => {
        this.model = x;
        this.onplay(x);
      });
    }
    if (changes.stop && this.stop) {
      this.stop.subscribe((x) => {
        this.onstop();
      });
    }
    if (changes.download && this.download) {
      this.download.subscribe((x) => {
        this.ondownload(x.filename, x.type);
      });
    }
    if (changes.resize && this.resize) {
      this.resize.subscribe((x) => {
        this.onresize(x.width, x.height);
      });
    }
    if (changes.fullscreen && this.fullscreen) {
      this.fullscreen.subscribe((x) => {
        this.onfullScreen();
      });
    }
    if (changes.frame && this.frame) {
      this.frame.subscribe((x) => {
        this.onframe();
      });
    }
    if (changes.resume && this.resume) {
      this.resume.subscribe((x) => {
        this.onresume();
      });
    }
    if (changes.speedResume && this.speedResume) {
      this.speedResume.subscribe((x) => {
        this.onspeedResume();
      });
    }
    if (changes.pause && this.pause) {
      this.pause.subscribe((x) => {
        this.onpause();
      });
    }
    if (changes.capturePicture && this.capturePicture) {
      this.capturePicture.subscribe((x) => {
        this.oncapturePicture();
      });
    }
    if (changes.slow && this.slow) {
      this.slow.subscribe((x) => {
        this.onslow();
      });
    }
    if (changes.fast && this.fast) {
      this.fast.subscribe((x) => {
        this.onfast();
      });
    }
    if (changes.changeRuleState && this.changeRuleState) {
      this.changeRuleState.subscribe((x) => {
        this.onchangeRuleState(x);
      });
    }
    if (changes.seek && this.seek) {
      this.seek.subscribe((x) => {
        this.onseek(x);
      });
    }
    this.load();
  }
  ngAfterViewInit(): void {
    this.load();
  }
  ngOnInit(): void {
    this.load();
  }
  ngOnDestroy(): void {
    if (this.registHandle) {
      clearTimeout(this.registHandle);
    }
    this.destroy.emit(this.model);
  }
  load() {
    if (!this.isloaded) {
      if (this.model) {
        this.url = this.model.toString();
        if (this.model.web) {
          this.webUrl = this.model.web;
        }
      }

      if (this.url) {
        let src = this.getSrc(this.webUrl, this.url, this.name);
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
        this.isloaded = true;
        this.loaded.emit();
      }
    }
  }

  onLoad(event: Event) {
    this.loadRuleState().then(() => {
      wait(
        () => {
          return !!this.player;
        },
        () => {
          this.eventRegist();
        }
      );
    });
    this.loadStream();
  }

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
      console.warn('loadRuleState error', ex);
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
  async loadStream() {
    try {
      let result = await this.userService.config.get(
        this.local.user.Id,
        UserConfigType.VideoStream
      );
      if (result) {
        this.stream = JSON.parse(result);
      }
    } catch (ex) {
      console.warn('loadSteam error', ex);
    }
  }
  eventRegist() {
    if (this.player) {
      this.player.getPosition = (index: number = 0, val: any) => {
        if (this.index != index) return;
        if (val >= 1) {
          this.playing = false;
        }
      };
      this.player.onPlaying = (index: number = 0) => {
        if (this.index != index) return;
        setTimeout(() => {
          if (this._ruleState !== undefined && this.player) {
            this.onchangeRuleState(this._ruleState);
          }
        }, 1000);
        this.onPlaying.emit();
      };
      this.player.onRuleStateChanged = (index: number = 0, state: boolean) => {
        if (this.index != index) return;
        // this.saveRuleState(state);
        this.onRuleStateChanged.emit(state);
      };
      this.player.onStoping = (index: number = 0) => {
        if (this.index != index) return;
        this.onStoping.emit(index);
      };
      this.player.getPosition = (index: number = 0, value: number) => {
        if (this.index != index) return;
        this.getPosition.emit(value);
      };
      this.player.onButtonClicked = (index: number = 0, btn: ButtonName) => {
        if (this.index != index) return;
        this.onButtonClicked.emit(btn);

        new Promise((x) => {
          let url = new HowellUrl(this.webUrl);
          if (
            location.hostname !== url.Host &&
            location.port != url.Port.toString()
          ) {
            switch (btn) {
              case ButtonName.fullscreen:
                if (this.iframe) {
                  (
                    this.iframe.nativeElement as HTMLIFrameElement
                  ).requestFullscreen();
                }
                break;

              default:
                break;
            }
          }
        });
      };

      this.player.onViewerClicked = (index: number = 0) => {
        if (this.index != index) return;
        this.onViewerClicked.emit(index);
      };
      this.player.onViewerDoubleClicked = (index: number = 0) => {
        if (this.index != index) return;
        this.onViewerDoubleClicked.emit(index);
        new Promise((x) => {
          let url = new HowellUrl(this.webUrl);
          if (
            location.hostname !== url.Host &&
            location.port != url.Port.toString()
          ) {
            if (this.iframe) {
              (
                this.iframe.nativeElement as HTMLIFrameElement
              ).requestFullscreen();
            }
          }
        });
      };
      this.player.onStatusChanged = (index: number = 0, state: PlayerState) => {
        if (this.index != index) return;
        switch (state) {
          case PlayerState.playing:
            this.onseek(this.reserve);
            break;

          default:
            break;
        }
      };
    }
  }
  onplay(model: VideoModel) {
    this.model = model;
    this.model.stream = this.stream;
    this.isloaded = false;
    this.load();
  }

  async onstop() {
    if (this.player) {
      return this.player.stop();
    }
    return;
  }

  ondownload(filename: string, type: string) {
    if (this.player) {
      this.player.download(filename, type);
    }
  }
  onresize(width: number, height: number) {
    if (this.player) {
      this.player.resize(width, height);
    }
  }
  onfullScreen() {
    if (this.player) {
      this.player.fullScreen();
    }
  }
  onframe() {
    if (this.player) {
      this.player.frame();
    }
  }
  onresume() {
    if (this.player) {
      this.player.resume();
    }
  }
  onspeedResume() {
    if (this.player) {
      this.player.speedResume();
    }
  }
  onpause() {
    if (this.player) {
      this.player.pause();
    }
  }
  oncapturePicture() {
    if (this.player) {
      this.player.capturePicture();
    }
  }
  onslow() {
    if (this.player) {
      this.player.slow();
    }
  }
  onfast() {
    if (this.player) {
      this.player.fast();
    }
  }
  onchangeRuleState(state: boolean) {
    if (this.player) {
      this.player.changeRuleState(state);
    }
  }
  onseek(value: number) {
    if (this.player) {
      this.player.seek(value);
    }
  }
}
