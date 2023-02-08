import { AccountInfoComponent } from './account-info/account-info.component';
import { AccountOperationComponent } from './account-operation/account-operation.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { SelectControlComponent } from './select-control/select-control.component';
import { StatisticLineEChartsComponent } from './statistic-line-echarts/statistic-line-echarts.component';
import { TabTitleComponent } from './tab-title/tab-title.component';
import { CommonTableComponent } from './common-table/common.component';
import { TimeComponent } from './time/time.component';
import { TotalWasteComponent } from './total-waste/total-waste.component';
import { TreeComponent } from './tree/tree.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

import { WindowComponent } from './window-control/window.component';
import { ImageControlComponent } from './image-control/image-control.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { TableSelectComponent } from './table-select/table-select.component';
import { VideoWindowComponent } from './video-window/video-window.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { ImageVideoControlComponent } from './image-video-control/image-video-control.component';
import { ImageVideoMultControlComponent } from './image-video-mult-control/image-video-mult-control.component';
import { SortHeaderComponent } from './sort-header/sort-header.component';
import { VideoSettingControlComponent } from './video-window/video-setting-control/video-setting-control.component';
import { VideoPresetPointControlComponent } from './video-window/video-preset-point-control/video-preset-point-control.component';
import { VideoPlaybackSettingControlComponent } from './video-window/video-playback-setting-control/video-playback-setting-control.component';
import { TimeControlComponent } from './time-control/time-control.component';
import { Table_COMPONENTS } from './tables/tables.module';
import { VideoDownloadPanelComponent } from './panels/video-download-panel/video-download-panel.component';
import { CHART_COMPONENTS } from './charts/chart-component';
import { SwitchComponent } from './switch/switch.component';
import { GarbageDropDurationPanelComponent } from './panels/garbage-drop-duration-panel/garbage-drop-duration-panel.component';
import { GarbageDropEventPanelComponent } from './panels/garbage-drop-event-panel/garbage-drop-event-panel.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CARD_COMPONENTS } from './cards/cards.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SimpleSearchComponent } from './simple-search/simple-search.component';
import { InputSearchOptionsComponent } from './input-search-options/input-search-options.component';
import { AIModelTreeComponent } from './ai-model-tree/ai-model-tree.component';
import { AICameraModelTableComponent } from './ai-camera-model-table/ai-camera-model-table.component';
import { LabelTreeComponent } from './label-tree/label-tree.component';
import { DivisionTreeComponent } from './division-tree/division-tree.component';
import { CommonTreeComponent } from './common-tree/common-tree.component';
import { RegionTreeComponent } from './region-tree/region-tree.component';
import { CommonLabelSelecComponent } from './common-label-select/common-label-select.component';
import { LabelOperateComponent } from './label-operate/label-operate.component';
import { ToastWindowComponent } from './toast-window/toast-window.component';
import { LabelManageFormComponent } from './label-manage-form/label-manage-form.component';
import { MixIntoComponent } from './mix-into/mix-into.component';
import { IllegalDropComponent } from './illegal-drop/illegal-drop.component';
import { CommonTabComponent } from './common-tab/common-tab.component';
import { IllegalDropEventComponent } from './illegal-drop-event/illegal-drop-event.component';
import { EventNumberStatisticComponent } from './event-number-statistic/event-number-statistic.component';
import { EventNumberChartComponent } from './event-number-chart/event-number-chart.component';
import { CoordinateManageComponent } from './coordinate-manage/coordinate-manage.component';
import { RankComponent } from './rank/rank.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { CommonElementListComponent } from './common-element-list/common-element-list.component';
import { CommonPieChartComponent } from './common-pie-chart/common-pie-chart.component';
import { CommonLineChartComponent } from './common-line-chart/common-line-chart.component';
import { CommonGaugeChartComponent } from './common-gauge-chart/common-gauge-chart.component';
import { CommonBarChartComponent } from './common-bar-chart/common-bar-chart.component';
import { UploadControlComponent } from './upload-control/upload-control.component';
import { CommonRankComponent } from './common-rank/common-rank.component';
import { VideoPlayerWindowComponent } from './video-player-window/video-player-window.component';
import { CommonStatisticCardComponent } from './common-statistic-card/common-statistic-card.component';
import { PictureWindowComponent } from './picture-window/picture-window.component';
import { SelectComponents } from './selects/selects.modules';
import { VideoPlayerListComponent } from './video-player-list/video-player-list.component';
import { VideoMultiplePlayerWindowComponent } from './windows/video-multiple-player-window/video-multiple-player-window.component';
import { LevelListPanelComponent } from './panels/level-list-panel/level-list-panel.component';
import { LevelDivisionPanelComponent } from './panels/level-division-panel/level-division-panel.component';

export const CUSTOM_COMPONENTS = [
  StatisticLineEChartsComponent,
  TreeComponent,
  TimeComponent,
  AccountInfoComponent,
  AccountOperationComponent,
  TotalWasteComponent,
  WindowComponent,
  SelectControlComponent,
  TabTitleComponent,
  HeaderNavComponent,
  VideoPlayerComponent,
  CommonTableComponent,
  ImageControlComponent,
  PaginatorComponent,
  TableSelectComponent,
  VideoWindowComponent,
  PictureWindowComponent,
  VideoPlayerWindowComponent,
  InputSearchComponent,
  InputSearchOptionsComponent,
  ImageVideoControlComponent,
  ImageVideoMultControlComponent,
  SortHeaderComponent,
  VideoSettingControlComponent,
  VideoPresetPointControlComponent,
  VideoPlaybackSettingControlComponent,
  TimeControlComponent,
  ...CARD_COMPONENTS,
  ...Table_COMPONENTS,
  VideoDownloadPanelComponent,
  SwitchComponent,
  ...CHART_COMPONENTS,
  GarbageDropDurationPanelComponent,
  GarbageDropEventPanelComponent,
  BreadcrumbComponent,
  ConfirmDialogComponent,
  SimpleSearchComponent,
  AIModelTreeComponent,
  AICameraModelTableComponent,
  LabelTreeComponent,
  DivisionTreeComponent,
  CommonTreeComponent,
  RegionTreeComponent,
  CommonLabelSelecComponent,
  LabelOperateComponent,
  LabelManageFormComponent,
  ToastWindowComponent,
  MixIntoComponent,
  IllegalDropComponent,
  CommonTabComponent,
  IllegalDropEventComponent,
  EventNumberStatisticComponent,
  EventNumberChartComponent,
  CoordinateManageComponent,
  RankComponent,
  CustomTableComponent,
  CommonElementListComponent,
  CommonPieChartComponent,
  CommonLineChartComponent,
  CommonGaugeChartComponent,
  CommonBarChartComponent,

  UploadControlComponent,
  CommonRankComponent,
  CommonStatisticCardComponent,

  VideoPlayerListComponent,
  VideoMultiplePlayerWindowComponent,
  ...SelectComponents,

  LevelListPanelComponent,
  LevelDivisionPanelComponent,
];
