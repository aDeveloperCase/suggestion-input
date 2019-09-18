import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { ISuggestionItem, ISearchService } from '../components/suggestion-input/suggestion-input.interface';

@Injectable({
  providedIn: 'root'
})
export class ITunesService implements ISearchService {

  iTunesUrl: string = 'https://itunes.apple.com/search';

  constructor(private http: HttpClient) { }

  public search(term: string, limit: number): Observable<ISuggestionItem[]> {
  	return this.http.get(this.iTunesUrl, {
  		params: {
  			limit: limit.toString(),
  			term,
  		}
  	}).pipe(
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
}
