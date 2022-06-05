import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthorizationService } from "src/app/network/request/auth/auth-request.service";
import { CommitteesIndexComponent } from "./index/index.component";

const routes: Routes = [
  {
    path: "",
    component: CommitteesIndexComponent,
    canActivate: [AuthorizationService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GarbageCommitteesRoutingModule {}
