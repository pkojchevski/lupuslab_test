import { AfterViewInit, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
  
  export interface InputFormValues {
    inputValue: string;
  }
  
  @Component({
    selector: 'app-input-form',
    templateUrl: './input-form.component.html',
    styleUrls: ['./input-form.component.sass'],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputFormComponent),
        multi: true
      },
      {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => InputFormComponent),
        multi:true
      }
    ]
  })
  export class InputFormComponent implements ControlValueAccessor, OnDestroy, OnInit, AfterViewInit {
    inputForm!: FormGroup;
    subscriptions: Subscription[] = [];

    @Input() placeholder: string = ""
    @Input() inputVal: string = ""
    @Input() type: string = "input"
    
    get inputValueControl() {
      return this.inputForm?.controls['inputValue'];
    }

    get value(): InputFormValues {
      return this.inputForm.value;
    }
  
    set value(value: InputFormValues) {
      this.inputForm.setValue(value);
      this.onChange(value);
      this.onTouched();
    }
  
  
    constructor(private fb: FormBuilder) {

    }

    ngOnInit() {
      console.log('this.inputVal:', this.inputVal)
      this.inputForm = this.fb.group({
        inputValue: ["", Validators.required]
      });

      
  
      this.subscriptions.push(
        // any time the inner form changes update the parent of any change
        this.inputForm.valueChanges.subscribe(value => {
          this.onChange(value);
          this.onTouched();
        })
      );
    }

    ngAfterViewInit() {
this.inputForm.patchValue({inputValue: this.inputVal})
    }
  
    ngOnDestroy() {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  
    onChange: any = () => {};
    onTouched: any = () => {};
  
    registerOnChange(fn: unknown) {
      this.onChange = fn;
    }
  
    writeValue(value: InputFormValues) {
      if (value) {
        this.value = value;
      }
  
      if (value === null) {
        this.inputForm.reset();
      }
    }
  
    registerOnTouched(fn:any) {
      this.onTouched = fn;
    }
  
    // communicate the inner form validation to the parent form
    validate(_: FormControl) {
      return this.inputForm.valid ? null : { inputValue: { valid: false } };
    }
  
  }
  
