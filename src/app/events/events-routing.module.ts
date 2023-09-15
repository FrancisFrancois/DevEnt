import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEventsComponent } from './list-events/list-events.component';
import { CreateEventsComponent } from './create-events/create-events.component';

const routes: Routes = [
  { path : "list-events", component : ListEventsComponent},
  { path : "create-events", component : CreateEventsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
