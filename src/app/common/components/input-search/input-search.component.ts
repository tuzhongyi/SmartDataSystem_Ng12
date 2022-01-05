import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.less'],
})
export class InputSearchComponent implements OnInit, AfterViewInit {
  searchInput = new FormControl('');

  @ViewChild('searchBtn')
  searchBtn?: ElementRef;

  @ViewChild('input')
  input?: ElementRef;

  @Input() placeholder = '';

  @Output() search: EventEmitter<string> = new EventEmitter();

  @Input()
  focusToSelectContent = false;

  /**
   * pmx 20211-08-18
   */
  // 双向绑定抛出内容
  searctText: string = '';

  constructor() {}

  focus(event: Event) {
    if (this.focusToSelectContent) {
      if (this.input) {
        this.input.nativeElement.select();
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.searchBtn) {
      const clicks = fromEvent(this.searchBtn.nativeElement, 'click');
      const result = clicks.pipe(throttleTime(500));
      if (this.input) {
        const keyUp = fromEvent(this.input.nativeElement, 'keyup');
        const keyUpEvent = keyUp.pipe(throttleTime(500));

        result.subscribe((x) => {
          this.search.emit(this.searctText);
        });
        keyUpEvent.subscribe((x: any) => {
          if (x.key.toLocaleLowerCase() == 'enter') {
            this.search.emit(this.searctText);
          }
        });
      }
    }
  }

  ngOnInit() {}
}
