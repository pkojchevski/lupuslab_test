
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GalleryService } from 'src/app/core/services/gallery.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.sass']
})
export class Page2Component implements OnInit {
  inputForm!: FormGroup
  images$!: Observable<any>;

  constructor(private galleryService: GalleryService, private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.inputForm = this.fb.group({
      inputValue:[],
    })
    this.images$ = this.galleryService.getImages();
  }

  get inputValue() {
    return this.inputForm?.get('inputValue')
  }



  async onSearch() {
    if(!this.inputForm.valid) return;
    const {inputValue} = this.inputValue?.value

    this.images$ = this.galleryService.getSearchedImages(inputValue)

  }

}

