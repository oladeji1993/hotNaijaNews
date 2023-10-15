import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { bookmarkModel } from '../model/bookmark.model';

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

  bookmarkNews(payload: bookmarkModel) {
    return this.http.post(`${environment.apiUrl}/addBookmark`, payload);
  }

  getAllBookmarkedNews() {
    return this.http.get(
      `${environment.apiUrl}/bookmarks`
    );
  }

  deleteBookmarkedNews(id: string) {
    return this.http.delete(
      `${environment.apiUrl}/bookmark/${id}`
    );
  }
}
