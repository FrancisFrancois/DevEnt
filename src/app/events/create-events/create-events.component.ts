import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.scss']
})
export class CreateEventsComponent {


  constructor(private _fb : FormBuilder, 
              private _router : Router,
          ) {
    
  }
}
