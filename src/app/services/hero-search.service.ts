import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Hero } from '../components/hero';
import { map } from 'rxjs/operators';

@Injectable()
export class HeroSearchService {

  constructor(private http: HttpClient) {}

  // 여기서는 Promise를 사용하지 않고 http.get()에서 Observable을 다른 RxJS연산자인 map()에 연결한 후 응답 데이터에서 Hero를 추출함
  search(term: string): Observable<Hero[]> {
    return this.http
      .get(`api/heroes/?name=${term}`).pipe(
        map(response => response as Hero[])
      );
  }
}
