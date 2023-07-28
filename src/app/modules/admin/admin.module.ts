import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminpageComponent } from './pages/adminpage/adminpage.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from '@modules/history/components/search/search.component';
import { HistoryModule } from '@modules/history/history.module';


@NgModule({
  declarations: [
    AdminpageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HistoryModule
  ]
})
export class AdminModule { }
