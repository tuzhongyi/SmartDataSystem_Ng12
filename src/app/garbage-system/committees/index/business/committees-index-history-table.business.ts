import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import {
  IllegalDropEventRecord,
  MixedIntoEventRecord,
} from 'src/app/network/model/garbage-event-record.model';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import {
  CommitteesHistoryTableTypes,
  CommitteesHistoryTableViewModel,
} from '../../histroy-table/committees-history-table.model';
import { CommitteesWindowBussiness } from './committees-window.business';

export class CommitteesIndexHistroyTableBussiness {
  constructor(private window: CommitteesWindowBussiness) {}

  Types = new CommitteesHistoryTableTypes();
  Type = this.Types.IllegalDrop;

  OnPictureClicked(model: ImageControlModelArray) {
    this.window.image.array.index = model.index;
    this.window.image.array.models = model.models;
    this.window.image.array.show = true;
  }
  OnVideoClicked(
    model: CommitteesHistoryTableViewModel<
      IllegalDropEventRecord | MixedIntoEventRecord
    >
  ) {
    if (model.ResourceId) {
      this.window.video.title = model.ResourceName ?? '';
      this.window.video.mask = true;
      this.window.video.playback(
        model.ResourceId,
        DateTimeTool.beforeOrAfter(model.EventTime)
      );
    }
  }
}
