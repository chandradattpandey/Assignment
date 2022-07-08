import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DealerComponent } from './dealer/dealer.component';
import { DealerCompComponent } from './dealer-comp/dealer-comp.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path:'dealer', component:DealerComponent
  },
  {
    path:"dashboard", component:DashboardComponent
  },
  {
    path:"view", component:ViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
