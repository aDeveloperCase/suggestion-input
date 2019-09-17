import { Component, Input, forwardRef, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SuggestionInputService } from '../../services/suggestion-input.service';
import { ISuggestionItem, IItemsCache } from './suggestion-input.interface';

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
	private onTouchedCallback: () => void = noop;
	private onChangeCallback: (_: any) => void = noop;
	private typingTimeout: ReturnType<typeof setTimeout>;

	public filteredItems: ISuggestionItem[];
	public itemsCache: IItemsCache = {};

	get value(): string {
		return this.innerValue;
	}

	set value(v: string) {
		if (v !== this.innerValue) {
			this.innerValue = v;
			this.onChangeCallback(v);
		}
	}

  constructor(private apiService: SuggestionInputService) {}

  ngOnChanges(changes: SimpleChanges) {
    const apiType: SimpleChange = changes.apiType;
    if (apiType.previousValue !== apiType.currentValue) {
    	this.filteredItems = [];
    }
  }

	onFocus() {
		this.onTouchedCallback;
	}

	onKeyup(event: KeyboardEvent) {
		clearTimeout(this.typingTimeout);

		const context = this;
		this.typingTimeout = setTimeout(function() {
			
			if (context.itemsCache[context.value]) {

				context.filteredItems = context.itemsCache[context.value];
			} else if (context.value.length > context.charsBeforeSearching) {

				context.apiService.search(context.value, context.suggestionLength, context.apiType)
					.subscribe(data => {
						context.filteredItems = data;
						context.itemsCache[context.value] = data;
					});
	    }
		}, 1000);
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
