import { Input } from '@angular/core';
import { Observable } from 'rxjs';

export interface ISuggestionItem {
  name: string;
  image: string;
}

export interface IItemsCache {
	[name: string]: ISuggestionItem[]
}

export abstract class ISearchService {
	abstract search(term: string, limit: number): Observable<ISuggestionItem[]>
}

export abstract class ISearchable {
  @Input() apiService: ISearchService;
}