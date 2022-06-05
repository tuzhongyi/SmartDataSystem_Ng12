import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommitteesIndexComponent } from "./index/index.component";
import { GarbageCommitteesRoutingModule } from "./garbage-committees-routing.module";

@NgModule({
  declarations: [
    CommitteesIndexComponent,
  ],
  imports: [
    CommonModule,    
    GarbageCommitteesRoutingModule,
  ],
})
export class GarbageCommitteesModule {}
