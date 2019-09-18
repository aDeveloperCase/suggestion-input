import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITunesService } from './itunes.service';

describe('ITunesService', () => {
	let service;
	let httpMock;

  beforeEach(() => {
		TestBed.configureTestingModule({
		  providers: [ITunesService],
		 	imports: [HttpClientTestingModule]
		});
		service = TestBed.get(ITunesService);
		httpMock = TestBed.get(HttpTestingController);
	});

	describe(':', () => {
		it('should be created', () => {
			expect(service).toBeTruthy();
		});

	  it('should be called correctly', () => {
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
	    // const responseMock = { data: true };
	    const limit = 7;
	    const term = "hello";

	    service.search(term, limit).subscribe(res => {
	    	expect(res).toEqual(responseMock);
	    });

	    const url = `${service.iTunesUrl}?limit=${limit}&term=${term}`;
	    const req = httpMock.expectOne(url);
	    req.flush(dataMock);
	  });
	});
});
