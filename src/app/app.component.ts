import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: String = "";
  apiType: String = "itunes";

  constructor() {}

  onTypeChange() {
  	this.data = "";
  }
}
