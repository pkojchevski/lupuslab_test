import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  page = 1;
  per_page = 21;

  constructor(private httpClient: HttpClient) { }


  getImages() {
    return this.httpClient.get(
      `${environment.unsplashUrl}/photos/?page=${this.page}&per_page=${this.per_page}&client_id=${environment.unsplashAccessKey}`)
  }

  getSearchedImages(searchQuery: string) {
    return this.httpClient.get(
      `${environment.unsplashUrl}/search?client_id=${environment.unsplashAccessKey}&query=${searchQuery}`)
       .pipe(
             map((res:any) => res.photos.results)
             )
  }
}
