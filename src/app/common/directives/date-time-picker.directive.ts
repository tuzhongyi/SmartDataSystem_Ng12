import {
  Directive,
  ElementRef,
  AfterContentInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { formatDate } from '@angular/common';
import { OneWeekDate } from '../tools/tool';

declare let $: any;

@Directive({
  selector: '[DateTimePicker]',
})
export class DateTimePickerDirective
  implements AfterContentInit, OnDestroy, OnChanges
{
  private ele: HTMLInputElement;
  @Input('format') format = 'yyyy-mm-dd';
  @Input('defaultVal') value: Date = new Date();
  // @Input('changeDate') changeDate: (val: any) => void;
  @Input('startView') startView: DateTimePickerView = DateTimePickerView.month;
  @Input('minView') minView: DateTimePickerView = DateTimePickerView.month;

  @Output('changeDate')
  changeDate: EventEmitter<Date> = new EventEmitter();

  constructor(e: ElementRef) {
    this.ele = e.nativeElement;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.reInit(this.startView, this.minView, this.format, this.value);
  }
  ngOnDestroy(): void {
    $(this.ele).datetimepicker('remove');
  }

  set setStartDate(val: string | Date) {
    $(this.ele).datetimepicker('update');
  }
  ngAfterContentInit() {
    let test = $(this.ele);
    console.log(test);
    $(this.ele)
      .datetimepicker({
        format: this.format,
        weekStart: 1,
        autoclose: true,
        startView: this.startView,
        minView: this.minView,
        forceParse: false,
        language: 'zh-CN',
        initialDate: this.value,
      })
      .on('changeDate', (ev: { date?: Date }) => {
        this.changeDate.emit(ev.date);
      })
      .on('show', (ev: any) => {
        const dayDom = $('.datetimepicker-days');
        dayDom.find('.week-tr').removeClass('week-tr');
      });
    $(this.ele).val(
      this.value instanceof Date
        ? formatDate(this.value, this.format, 'en')
        : this.value
    );
  }

  reInit(
    startView: number,
    minView: number,
    format: string,
    defaultVal: Date,
    week?: boolean
  ) {
    $(this.ele).val('');
    let test = $(this.ele);
    console.log(test);
    $(this.ele).datetimepicker('remove').off('changeDate').off('show');
    if (week) {
      $(this.ele)
        .datetimepicker({
          format: format,
          weekStart: 1,
          autoclose: true,
          startView: startView,
          minView: minView,
          language: 'zh-CN',
          forceParse: false,
          initialDate: defaultVal,
        })
        .on('changeDate', (ev: { date: Date }) => {
          this.changeDate.emit(ev.date);
          const week_ = OneWeekDate(ev.date);
          $(this.ele).val(
            `${formatDate(
              week_.monday,
              'yyyy年MM月dd日',
              'en'
            )} 至 ${formatDate(week_.sunday, 'yyyy年MM月dd日', 'en')}`
          );
        })
        .on('show', (ev: { date: any }) => {
          const dayDom = $('.datetimepicker-days');
          dayDom.find('.week-tr').removeClass('week-tr');
          dayDom.addClass('week');
          var tbody = dayDom.find('tbody'),
            trs = tbody.find('tr'),
            d = formatDate(ev.date, 'dd', 'en');
          d = parseInt(d) + ''; //console.log(d);

          $(trs).each(function (index: number, element: any) {
            var tds = $(element).children();
            $(tds).each(function (i: number, el: any) {
              if (
                $(el).hasClass('old') == false &&
                $(el).hasClass('new') == false &&
                $(el).text() == d
              ) {
                $(el).parent().addClass('week-tr');
              }
            });
          });
        });
      const week_ = OneWeekDate(new Date(defaultVal));
      $(this.ele).val(
        `${formatDate(week_.monday, 'yyyy年MM月dd日', 'en')} 至 ${formatDate(
          week_.sunday,
          'yyyy年MM月dd日',
          'en'
        )}`
      );
    } else {
      $(this.ele)
        .datetimepicker({
          format: format,
          weekStart: 1,
          autoclose: true,
          startView: startView,
          minView: minView,
          language: 'zh-CN',
          forceParse: false,
          initialDate: defaultVal,
        })
        .on('changeDate', (ev: { date: Date | undefined }) => {
          if (this.changeDate) this.changeDate.emit(ev.date);
        })
        .on('show', (ev: any) => {
          const dayDom = $('.datetimepicker-days');
          dayDom.find('.week-tr').removeClass('week-tr');
        });
      $(this.ele).val(
        this.value instanceof Date
          ? formatDate(this.value, this.format, 'en')
          : this.value
      );
    }
  }
}

@Directive({
  selector: '[DateTimePickerMirror]',
})
export class DateTimePickerMirrorDirective extends DateTimePickerDirective {}

/**
 * 0 or 'hour' for the hour view
 * 1 or 'day' for the day view
 * 2 or 'month' for month view (the default)
 * 3 or 'year' for the 12-month overview
 * 4 or 'decade' for the 10-year overview. Useful for date-of-birth datetimepickers.
 */
export enum DateTimePickerView {
  /** 0 or 'hour' for the hour view */
  hour = 0,
  /** 1 or 'day' for the day view */
  day = 1,
  /** 2 or 'month' for month view (the default) */
  month = 2,
  /** 3 or 'year' for the 12-month overview */
  year = 3,
  /** 4 or 'decade' for the 10-year overview. Useful for date-of-birth datetimepickers. */
  decade = 4,
}
