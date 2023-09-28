import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { EventRecordConverter } from 'src/app/common/components/tables/event-record/event-record.converter';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import {
  IllegalDropEventRecord,
  MixedIntoEventRecord,
} from 'src/app/network/model/garbage-event-record.model';
import { CommitteesHistoryTableViewModel } from './committees-history-table.model';

@Injectable()
export class CommitteesHistoryTableConverter
  implements
    IPromiseConverter<
      Array<IllegalDropEventRecord | MixedIntoEventRecord>,
      CommitteesHistoryTableViewModel<
        IllegalDropEventRecord | MixedIntoEventRecord
      >[]
    >
{
  constructor(private eventConverter: EventRecordConverter) {}

  async Convert(
    input: Array<IllegalDropEventRecord | MixedIntoEventRecord>
  ): Promise<
    CommitteesHistoryTableViewModel<
      IllegalDropEventRecord | MixedIntoEventRecord
    >[]
  > {
    let array = new Array();
    for (let i = 0; i < input.length; i++) {
      let item = await this.ConvertItem(input[i]);
      array.push(item);
    }

    return array;
  }

  async ConvertItem(
    input: IllegalDropEventRecord | MixedIntoEventRecord
  ): Promise<
    CommitteesHistoryTableViewModel<
      IllegalDropEventRecord | MixedIntoEventRecord
    >
  > {
    let vm = new CommitteesHistoryTableViewModel<
      IllegalDropEventRecord | MixedIntoEventRecord
    >();

    let event = await this.eventConverter.Convert(input);
    vm = Object.assign(vm, event);
    vm.Data = input;
    vm.Id = input.EventId;
    vm.DateFormatter = formatDate(input.EventTime, 'HH:mm', 'en');
    return vm;
  }
}
