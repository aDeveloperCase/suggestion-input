import { Component } from '@angular/core';

import { ISearchService } from './components/suggestion-input/suggestion-input.interface';
import { ITunesService } from './services/itunes.service';
import { BreweryService } from './services/brewery.service';

const API_BREWERY = 'brewery';
const API_ITUNES = 'iTunes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: string = "";
  apiService: ISearchService;
  apiType: string = API_ITUNES;
  API_BREWERY = API_BREWERY;
	API_ITUNES = API_ITUNES;

  constructor(private itunesService: ITunesService, private breweryService: BreweryService) {
    this.apiService = this.itunesService;
  }

  onTypeChange() {
  	this.data = "";
  	switch (this.apiType) {
  		case API_ITUNES:
  			this.apiService = this.itunesService;
  			break;
  		case API_BREWERY:
  			this.apiService = this.breweryService;
  			break;
  		default:
        this.apiService = this.itunesService;
        break;
  	}
  }
}
