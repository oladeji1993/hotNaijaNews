import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private http: HttpClient) {}

  getAllnews(sources: string) {
    return this.http.get(
      `${environment.newsApiUrl}/top-headlines?sources=${sources}&apiKey=${environment.newsApiKey}`
    );
  }

  allSources() {
    return this.http.get(
      `${environment.newsApiUrl}/sources?apiKey=${environment.newsApiKey}`
    );
  }

  bookmarkNews(source: string){
    return this.http.post(`${environment.authApiUrl}/bookmark`, source)
  }

  getAllBookmarkedNews(sources: string){
    return this.http.get(`${environment.newsApiUrl}/top-headlines?${sources}&apiKey=${environment.newsApiKey}`)
  }
}
