import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewComponent } from './view/view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DealerComponent } from './dealer/dealer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DealerCompComponent } from './dealer-comp/dealer-comp.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal'; 
import { CarDealerService } from './service/car-dealer.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ViewComponent,
    NavbarComponent,
    DealerComponent,
    DealerCompComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
