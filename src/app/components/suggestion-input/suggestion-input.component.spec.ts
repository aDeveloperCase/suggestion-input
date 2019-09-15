import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
import { SuggestionInputService } from '../../services/suggestion-input.service';

const responseMock = [
  {image: "aaa", name: "bbb - ccc"},
  {image: "aaa", name: "bbb - ccc"},
  {image: "aaa", name: "bbb - ccc"},
  {image: "aaa", name: "bbb - ccc"},
  {image: "aaa", name: "bbb - ccc"}
];

describe('SuggestionInputComponent', () => {
  let component: SuggestionInputComponent;
  let fixture: ComponentFixture<SuggestionInputComponent>;
  let suggestionInputService: SuggestionInputService;

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
        BrowserAnimationsModule
      ],
      providers: [
        SuggestionInputService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    suggestionInputService = TestBed.get(SuggestionInputService);
    fixture = TestBed.createComponent(SuggestionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('suggestions work and service is called', async () => {
    let spy = spyOn(suggestionInputService, 'search').and.returnValue(of(responseMock));

    let input = fixture.debugElement.query(By.css('input'));
    let el = input.nativeElement;

    el.value = 'hello';
    el.dispatchEvent(new Event('input'));

    expect(fixture.componentInstance.value).toBe('hello');
    expect(spy).toHaveBeenCalledTimes(1)

    el.click();

    fixture.detectChanges();
    let options = fixture.debugElement.queryAll(By.css('.mat-option'));
    expect(options.length).toBe(5);

    let firstOption = options[0].nativeElement;
    firstOption.click();

    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(responseMock[0].name);
  });
});
