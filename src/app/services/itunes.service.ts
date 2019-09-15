import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ITunesService {

  iTunesUrl: string = 'https://itunes.apple.com/search';

  constructor(private http: HttpClient) { }

  public search(term: string, limit: number) {
  	return this.http.get(this.iTunesUrl, {
  		params: {
  			limit: limit.toString(),
  			term,
  		}
  	});
  }
}
