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
import {
  SearchOptionKey,
  SearchOptions,
} from 'src/app/view-model/search-options.model';
import { SelectItem } from '../select-control/select-control.model';
@Component({
  selector: 'app-input-search-options',
  templateUrl: './input-search-options.component.html',
  styleUrls: ['./input-search-options.component.less'],
})
export class InputSearchOptionsComponent implements OnInit, AfterViewInit {
  searchInput = new FormControl('');

  @ViewChild('searchBtn')
  searchBtn?: ElementRef;

  @ViewChild('input')
  input?: ElementRef;

  @Input() placeholder = '';

  @Output() search: EventEmitter<SearchOptions> = new EventEmitter();

  @Input()
  focusToSelectContent = false;

  /**
   * pmx 20211-08-18
   */
  // 双向绑定抛出内容
  searctText: string = '';

  key = SearchOptionKey.name;

  keys: SelectItem[] = [];

  constructor() {}

  initKeys() {
    this.keys.push(
      new SelectItem(SearchOptionKey.name, SearchOptionKey.name, '投放点')
    );
    this.keys.push(
      new SelectItem(
        SearchOptionKey.community,
        SearchOptionKey.community,
        '社区'
      )
    );
  }

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
          let opts: SearchOptions = {
            text: this.searctText,
            propertyName: this.key,
          };
          this.search.emit(opts);
        });
        keyUpEvent.subscribe((x: any) => {
          if (x.key.toLocaleLowerCase() == 'enter') {
            let opts = {
              text: this.searctText,
              propertyName: this.key,
            };
            this.search.emit(opts);
          }
        });
      }
    }
  }

  ngOnInit() {
    this.initKeys();
  }

  onselect(item: SelectItem) {
    this.key = item.value;
  }
}
