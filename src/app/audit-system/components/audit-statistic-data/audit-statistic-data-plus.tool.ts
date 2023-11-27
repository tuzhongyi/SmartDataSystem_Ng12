import { Injectable } from '@angular/core';
import { Tool } from 'src/app/common/tools/tool';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { EventNumber } from 'src/app/network/model/garbage-station/event-number.model';
import { Level3Statistic } from 'src/app/network/model/garbage-station/level-3-statistic.model';

@Injectable()
export class AuditStatisticPlusTool {
  EventNumber(a: EventNumber, b: EventNumber): EventNumber {
    return {
      EventType: a.EventType,
      DayNumber: Tool.plus(a.DayNumber, b.DayNumber)!,
      DeltaNumber: Tool.plus(a.DeltaNumber, b.DeltaNumber),
    };
  }
  DivisionNumberStatisticV2(
    a: DivisionNumberStatisticV2,
    b: DivisionNumberStatisticV2
  ): DivisionNumberStatisticV2 {
    let c = new DivisionNumberStatisticV2();
    c.CompleteTaskCount = Tool.plus(a.CompleteTaskCount, b.CompleteTaskCount);
    c.DryVolume = Tool.plus(a.DryVolume, b.DryVolume);
    c.Time = a.Time;
    c.TimeoutTaskCount = Tool.plus(a.TimeoutTaskCount, b.TimeoutTaskCount);
    c.TotalTaskCount = Tool.plus(a.TotalTaskCount, b.TotalTaskCount);
    c.Volume = Tool.plus(a.Volume, b.Volume);
    c.WetVolume = Tool.plus(a.WetVolume, b.WetVolume);

    c.Level3Statistic = Tool.plus(
      a.Level3Statistic,
      b.Level3Statistic,
      (a, b) => this.Level3Statistic(a, b)
    );

    return c;
  }

  Level3Statistic(a: Level3Statistic, b: Level3Statistic) {
    let c = new Level3Statistic();

    c.Level1Number = Tool.plus(a.Level1Number, b.Level1Number);
    c.Level2Number = Tool.plus(a.Level2Number, b.Level2Number);
    c.Level3Number = Tool.plus(a.Level3Number, b.Level3Number);
    c.AllLevelNumber = Tool.plus(a.AllLevelNumber, b.AllLevelNumber);
    c.TotalFeedbackSeconds = Tool.plus(
      a.TotalFeedbackSeconds,
      b.TotalFeedbackSeconds
    );
    c.AvgFeedbackSeconds = Tool.plus(
      a.AvgFeedbackSeconds,
      b.AvgFeedbackSeconds
    );
    c.FeedbackNumber = Tool.plus(a.FeedbackNumber, b.FeedbackNumber);
    c.FeedbackRatio = Tool.plus(a.FeedbackRatio, b.FeedbackRatio);
    c.SupervisedNumber = Tool.plus(a.SupervisedNumber, b.SupervisedNumber);
    c.Level1FeedbackNumber = Tool.plus(
      a.Level1FeedbackNumber,
      b.Level1FeedbackNumber
    );
    c.Level2FeedbackNumber = Tool.plus(
      a.Level2FeedbackNumber,
      b.Level2FeedbackNumber
    );
    c.Level3FeedbackNumber = Tool.plus(
      a.Level3FeedbackNumber,
      b.Level3FeedbackNumber
    );
    c.PropertyFeedbackNumber = Tool.plus(
      a.PropertyFeedbackNumber,
      b.PropertyFeedbackNumber
    );
    c.ThirdPartFeedbackNumber = Tool.plus(
      a.ThirdPartFeedbackNumber,
      b.ThirdPartFeedbackNumber
    );
    return c;
  }

  DivisionNumberStatistic(
    a: DivisionNumberStatistic,
    b: DivisionNumberStatistic
  ) {
    let c = new DivisionNumberStatistic();
    c.CurrentGarbageTime = a.CurrentGarbageTime;
    c.StationNumber = Tool.plus(a.StationNumber, b.StationNumber);
    c.CameraNumber = Tool.plus(a.CameraNumber, b.CameraNumber);
    c.OfflineCameraNumber = Tool.plus(
      a.OfflineCameraNumber,
      b.OfflineCameraNumber
    );
    c.TrashCanNumber = Tool.plus(a.TrashCanNumber, b.TrashCanNumber);
    c.ChildDivisionNumber = Tool.plus(
      a.ChildDivisionNumber,
      b.ChildDivisionNumber
    );
    c.LeafDivisionNumber = Tool.plus(
      a.LeafDivisionNumber,
      b.LeafDivisionNumber
    );
    c.DryFullStationNumber = Tool.plus(
      a.DryFullStationNumber,
      b.DryFullStationNumber
    );
    c.WetFullStationNumber = Tool.plus(
      a.WetFullStationNumber,
      b.WetFullStationNumber
    );

    c.DayVolume = Tool.plus(a.DayVolume, b.DayVolume);
    c.DayDryVolume = Tool.plus(a.DayDryVolume, b.DayDryVolume);
    c.DayWetVolume = Tool.plus(a.DayWetVolume, b.DayWetVolume);
    c.GarbageDropStationNumber = Tool.plus(
      a.GarbageDropStationNumber,
      b.GarbageDropStationNumber
    );
    c.TotalTaskCount = Tool.plus(a.TotalTaskCount, b.TotalTaskCount);
    c.CompleteTaskCount = Tool.plus(a.CompleteTaskCount, b.CompleteTaskCount);
    c.TimeoutTaskCount = Tool.plus(a.TimeoutTaskCount, b.TimeoutTaskCount);
    c.CommunityNumber = Tool.plus(a.CommunityNumber, b.CommunityNumber);

    c.Level3Statistic = Tool.plus(
      a.Level3Statistic,
      b.Level3Statistic,
      (a, b) => this.Level3Statistic(a, b)
    );
    // c.GarbageWeights?: GarbageWeight[];
    c.TodayEventNumbers = this.Array(
      a.TodayEventNumbers ?? [],
      b.TodayEventNumbers ?? [],
      'EventType',
      this.EventNumber
    );
    return c;
  }

  Array<T>(
    a: Array<T>,
    b: Array<T>,
    key: string,
    plus?: (a: T, b: T) => T
  ): Array<T> {
    let all = [...a, ...b];
    let group = Tool.groupBy(all, key);
    let array = [];
    for (let i = 0; i < group.length; i++) {
      let c = group[i][0];
      for (let j = 0; j < group[i].length - 1; j++) {
        let b = group[i][j + 1];
        c = Tool.plus(c, b, plus);
      }
      array.push(c);
    }
    return array;
  }
}
