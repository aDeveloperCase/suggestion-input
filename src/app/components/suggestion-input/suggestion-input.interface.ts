import { Observable } from 'rxjs';

export interface ISuggestionItem {
  name: string;
  image: string;
}

export interface IItemsCache {
	[name: string]: ISuggestionItem[]
}