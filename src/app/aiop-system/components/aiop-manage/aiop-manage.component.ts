import { state, style, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, ResolveEnd, Router } from '@angular/router';

@Component({
  templateUrl: './aiop-manage.component.html',
  styleUrls: ['./aiop-manage.component.less'],
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
          width: 100,
        })
      ),
    ]),
  ],
})
export class AiopSystemManageComponent implements OnInit {
  state: 'grow' | 'shrink' = 'grow';

  constructor(private _router: Router) {
    this._router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        console.log('sdf', e);
      }
    });
  }
  ngOnInit(): void {
    console.log('init');
  }
  toggle() {
    if (this.state == 'grow') {
      this.state = 'shrink';
    } else {
      this.state = 'grow';
    }
  }
}
