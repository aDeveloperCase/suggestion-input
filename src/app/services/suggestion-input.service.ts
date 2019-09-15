import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { ITunesService } from './itunes.service';
import { BreweryService } from './brewery.service';

import { ISuggestionItem } from '../components/suggestion-input/suggestion-input.interface';

const apiTypes = {
  itunes: "searchITunes",
  brewery: "searchBrewery"
}

@Injectable({
  providedIn: 'root'
})
export class SuggestionInputService {

  constructor(
  	private iTunes: ITunesService,
  	private brewery: BreweryService
  ) { }

  public search(term: string, limit: number, apiType: string): Observable<ISuggestionItem[]> {
  	return this[apiTypes[apiType]](term, limit);
  }

  private searchITunes(term: string, limit: number): Observable<ISuggestionItem[]> {
  	return this.iTunes.search(term, limit)
  		.pipe(
	  		map((response: any) => {
	  			if (response.resultCount) {
	  				return response.results.map(item => {
	  					return {
	  						image: item.artworkUrl60,
	  						name: item.trackName + ' - ' + item.artistName
	  					};
	  				});
	  			}

	  			return [];
	  		})
  		);
  }

  private searchBrewery(term: string, limit: number): Observable<ISuggestionItem[]> {
  	return this.brewery.search(term)
  		.pipe(
  			map((response: any) => {
  				return response.slice(0, limit).map(item => {
  					return {
  						image: null,
  						name: item.name
  					};
  				});
  			})
  		);
  }

}
