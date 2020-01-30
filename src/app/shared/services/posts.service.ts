import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {FbCreateResponse, Post} from '../interfaces/interfaces';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  constructor(private http: HttpClient) {
  }

// Создаем и сохраняем пост в БД фаербейза;
  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.dbUrl}/posts.json`, post)
      .pipe(
        map((response: FbCreateResponse) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          };
        })
      );
  }
}
