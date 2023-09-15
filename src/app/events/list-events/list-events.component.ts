import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventApiService } from 'src/app/shared/services/event-api.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent {
  eventList : Event[] = [];

  constructor(private _activeRoute : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.eventList = this._activeRoute.snapshot.data['']
  }
}
