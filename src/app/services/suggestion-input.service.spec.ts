import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SuggestionInputService } from './suggestion-input.service';

const breweryUrl = "https://api.openbrewerydb.org/breweries/autocomplete";
const iTunesUrl = 'https://itunes.apple.com/search';

describe('SuggestionInputService', () => {
	let service;
	let httpMock;

  beforeEach(() => {
		TestBed.configureTestingModule({
		  providers: [SuggestionInputService],
		 	imports: [HttpClientTestingModule]
		});
		service = TestBed.get(SuggestionInputService);
		httpMock = TestBed.get(HttpTestingController);
	});

	describe(':', () => {
		it('should be created', () => {
			expect(service).toBeTruthy();
		});

	  it('breweryApi should be called correctly', () => {
	    const responseMock = [1, 2, 3, 4, 5, 6, 7];
	    const limit = 3;
	    const query = "hello";
	    const apiType = "brewery";

	    service.search(query, limit, apiType).subscribe(res => {
	    	expect(res.length).toBe(limit);
	    });

	    const url = `${breweryUrl}?query=${query}`;
	    const req = httpMock.expectOne(url);
	    req.flush(responseMock);
	  });

	  it('iTunesApi should be called correctly', () => {
	    const dataMock = {
	    	resultCount: 5,
	    	results: [
		  		{artworkUrl60: "aaa", trackName: "bbb", artistName: "ccc"},
		  		{artworkUrl60: "aaa", trackName: "bbb", artistName: "ccc"},
		  		{artworkUrl60: "aaa", trackName: "bbb", artistName: "ccc"},
		  		{artworkUrl60: "aaa", trackName: "bbb", artistName: "ccc"},
		  		{artworkUrl60: "aaa", trackName: "bbb", artistName: "ccc"}
	  		]
	  	};
	  	const responseMock = [
	  		{image: "aaa", name: "bbb - ccc"},
	  		{image: "aaa", name: "bbb - ccc"},
	  		{image: "aaa", name: "bbb - ccc"},
	  		{image: "aaa", name: "bbb - ccc"},
	  		{image: "aaa", name: "bbb - ccc"}
	  	];

	    const limit = 7;
	    const term = "hello";
	    const apiType = "itunes";

	    service.search(term, limit, apiType).subscribe(res => {
	    	expect(res).toEqual(responseMock);
	    });

	    const url = `${iTunesUrl}?limit=${limit}&term=${term}`;
	    const req = httpMock.expectOne(url);
	    req.flush(dataMock);
	  });
	});
});
