import { async, ComponentFixture, TestBed, tick, fakeAsync, inject, discardPeriodicTasks } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import {
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatAutocompleteModule,
  MatRadioModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SuggestionInputComponent } from './suggestion-input.component';
import { ISearchService } from './suggestion-input.interface';
import { ITunesService } from '../../services/itunes.service';

const responseMock = [
  {image: "aaa", name: "bbb - ccc"},
  {image: "aaa", name: "bbb - ccc"},
  {image: "aaa", name: "bbb - ccc"},
  {image: "aaa", name: "bbb - ccc"},
  {image: "aaa", name: "bbb - ccc"}
];

fdescribe('SuggestionInputComponent', () => {
  let component: SuggestionInputComponent;
  let fixture: ComponentFixture<SuggestionInputComponent>;
  // let apiService: ISearchService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionInputComponent ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatAutocompleteModule,
        MatRadioModule,
        FormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        ITunesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // apiService = TestBed.get(ITunesService);
    fixture = TestBed.createComponent(SuggestionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('suggestions work and service is called', inject([ITunesService], <any>fakeAsync ((apiService: ITunesService) => {
    component.apiService = apiService;
    let spy = spyOn(component.apiService, 'search').and.returnValue(of(responseMock));

    let input = fixture.debugElement.query(By.css('input'));
    let el = input.nativeElement;

    el.value = 'hello';
    el.dispatchEvent(new Event('input'));
    el.dispatchEvent(new Event('keyup'));

    expect(fixture.componentInstance.value).toBe('hello');
    expect(spy).toHaveBeenCalledTimes(0)

    tick(1050);
    expect(spy).toHaveBeenCalledTimes(1);

    el.click();

    fixture.detectChanges();
    let options = fixture.debugElement.queryAll(By.css('.mat-option'));
    expect(options.length).toBe(5);

    let firstOption = options[0].nativeElement;
    firstOption.click();

    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(responseMock[0].name);

    discardPeriodicTasks();
  })));
});
