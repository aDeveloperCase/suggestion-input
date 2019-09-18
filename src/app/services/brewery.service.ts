import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { ISuggestionItem, ISearchService } from '../components/suggestion-input/suggestion-input.interface';

@Injectable({
  providedIn: 'root'
})
export class BreweryService implements ISearchService {

	breweryUrl = "https://api.openbrewerydb.org/breweries/autocomplete";

  constructor(private http: HttpClient) { }

  public search(term: string, limit: number): Observable<ISuggestionItem[]> {
  	return this.http.get(this.breweryUrl, {
  		params: {
  			query: term
  		}
  	}).pipe(
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
