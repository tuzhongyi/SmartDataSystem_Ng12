import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { DapuqiaoMainSuperviseButtonBusiness } from './dapuqiao-main-supervise-button.business';

@Component({
  selector: 'dapuqiao-main-supervise-button',
  templateUrl: './dapuqiao-main-supervise-button.component.html',
  styleUrls: ['./dapuqiao-main-supervise-button.component.less'],
  providers: [DapuqiaoMainSuperviseButtonBusiness],
})
export class DapuqiaoMainSuperviseButtonComponent implements OnInit {
  @Input() value: number = 0;
  @Input() load?: EventEmitter<void>;

  constructor(private business: DapuqiaoMainSuperviseButtonBusiness) {}

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.loadData();
      });
    }
    this.loadData();
  }

  loadData() {
    this.business.load().then((x) => {
      this.value = x;
    });
  }
}
