import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BreweryService } from './brewery.service';

describe('BreweryService', () => {
	let service;
	let httpMock;

  beforeEach(() => {
		TestBed.configureTestingModule({
		  providers: [BreweryService],
		 	imports: [HttpClientTestingModule]
		});
		service = TestBed.get(BreweryService);
		httpMock = TestBed.get(HttpTestingController);
	});

	describe(':', () => {
		it('should be created', () => {
			expect(service).toBeTruthy();
		});

	  it('should be called correctly', () => {
	    const responseMock = [1, 2, 3, 4, 5, 6, 7];
	    const limit = 3;
	    const query = "hello";

	    service.search(query, limit).subscribe(res => {
	    	expect(res.length).toBe(limit);
	    });

	    const url = `${service.breweryUrl}?query=${query}`;
	    const req = httpMock.expectOne(url);
	    req.flush(responseMock);
	  });
	});
});
