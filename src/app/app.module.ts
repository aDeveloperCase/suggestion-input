import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatAutocompleteModule,
  MatRadioModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { SuggestionInputComponent } from './components/suggestion-input/suggestion-input.component';

@NgModule({
  declarations: [
    AppComponent,
    SuggestionInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
