import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISideNavConfig } from '../../models/sidenav-config';
import { wait } from '../../tools/tool';

@Component({
  selector: 'howell-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.less'],
  animations: [
    trigger('growShrink', [
      state(
        'grow',
        style({
          width: '*',
        })
      ),
      state(
        'shrink',
        style({
          width: 110,
        })
      ),
      transition('grow<=>shrink', [animate(100)]),
    ]),
  ],
})
export class SidenavComponent implements OnInit, OnChanges, OnDestroy {
  state: 'grow' | 'shrink' = 'grow';
  groups = {
    first: '',
    second: '',
    third: '',
  };

  private _subscription!: Subscription;

  // 后行断言+捕获+量词+非捕获
  @Input() regExp =
    /(?<=\/[\w-]+\/[\w-]+\/)(?<first>[\w-]*)(?:\/(?<second>[\w-]*)(?:\/(?<third>[\w-]*))?)?\/?$/;

  models: Array<ISideNavConfig> = [];

  inited = false;

  constructor(private _router: Router, private _activeRoute: ActivatedRoute) {
    this._subscription = this._router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        // console.log('router', e);
        wait(
          () => {
            return this.inited;
          },
          () => {
            let mode = e.urlAfterRedirects.match(this.regExp);
            // console.log('mode: ', mode);
            if (mode && mode.groups && mode.groups.first) {
              Object.assign(this.groups, mode.groups);
              console.log(mode.groups['first']);
              import(`src/assets/json/${mode.groups['first']}.json`).then(
                (config) => {
                  // console.log('config', config.data);

                  this.models = config.data;
                }
              );
            }
          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.inited = true;
  }
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
  toggle() {
    if (this.state == 'grow') {
      this.state = 'shrink';
    } else {
      this.state = 'grow';
    }
  }
  clickBtn(model: ISideNavConfig) {
    let mode = model.path.match(this.regExp);
    if (mode?.groups?.second == this.groups.second) {
      console.log('同一父标签');
      return;
    }

    this._router.navigateByUrl(model.path);
  }
}
