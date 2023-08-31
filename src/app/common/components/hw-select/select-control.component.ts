import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'hw-select',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.less'],
})
export class HowellSelectComponent implements OnInit, AfterViewChecked {
  @Input()
  cannull: boolean = false;

  @Input()
  public set style(v: any) {
    if (this._style === undefined) {
      this._style = {};
    }
    this._style = Object.assign(this._style, v);
  }
  private _style: any;
  public get style(): any {
    return this._style;
  }

  private _selected?: any = undefined;
  public get selected(): any | undefined {
    return this._selected;
  }
  @Input()
  public set selected(v: any | undefined) {
    this._selected = v;
    this.selectedChange.emit(v);
  }
  @Output()
  selectedChange: EventEmitter<any> = new EventEmitter();

  constructor(public detector: ChangeDetectorRef) {}
  ngAfterViewChecked(): void {
    if (this.element && this.cannull) {
      if (this.selected === undefined) {
        (this.element.nativeElement as HTMLSelectElement).value = '';
      }
    }
  }

  @ViewChild('element')
  element?: ElementRef;

  ngOnInit(): void {}

  onclear(e: Event) {
    this.selected = undefined;

    e.stopImmediatePropagation();
  }
}
