import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {

	breweryUrl = "https://api.openbrewerydb.org/breweries/autocomplete";

  constructor(private http: HttpClient) { }

  public search(term: string) {
  	return this.http.get(this.breweryUrl, {
  		params: {
  			query: term
  		}
  	});
  }
}
