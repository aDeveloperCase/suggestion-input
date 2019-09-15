import { Component, Input, forwardRef, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SuggestionInputService } from '../../services/suggestion-input.service';
import { ISuggestionItem } from './suggestion-input.interface';

const noop = () => {
};

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuggestionInputComponent),
    multi: true
};

@Component({
  selector: 'suggestion-input',
  templateUrl: './suggestion-input.component.html',
  styleUrls: ['./suggestion-input.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SuggestionInputComponent implements ControlValueAccessor, OnChanges {
  @Input() suggestionLength: number = 5;
  @Input() charsBeforeSearching: number = 1;
  @Input() apiType: string = 'itunes';

	private innerValue: any = '';
	private filteredItems: Observable<ISuggestionItem[]>;
	private onTouchedCallback: () => void = noop;
	private onChangeCallback: (_: any) => void = noop;

	get value(): any {
		return this.innerValue;
	}

	set value(v: any) {
		if (v !== this.innerValue) {
			this.innerValue = v;
			this.onChangeCallback(v);

	      if (v.length > this.charsBeforeSearching) {
	        this.filteredItems = this.apiService.search(v, this.suggestionLength, this.apiType);
	      }
		}
	}

  constructor(private apiService: SuggestionInputService) {}

  ngOnChanges(changes: SimpleChanges) {
    const apiType: SimpleChange = changes.apiType;
    if (apiType.previousValue !== apiType.currentValue) {
    	this.filteredItems = of([]);
    }
  }

	onBlur() {
		this.onTouchedCallback;
	}

	writeValue(value: any) {
		if (value !== this.innerValue) {
			this.innerValue = value;
		}
	}

	registerOnChange(fn: any) {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any) {
		this.onTouchedCallback = fn;
	}

}
