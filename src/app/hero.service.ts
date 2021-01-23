import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Hero } from './hero';

// Injectable Decorator추가 -> TypeScript가 Service에 대한 메타 데이터를 보내도록 지시함
// HeroService는 웹 서비스, 로컬 스토리지 또는 Mock데이터 소스와 같이 어디서나 Hero데이터를 가져올 수 있습니다.
@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // 각각의 Http Service메소드는 HTTP Response객체의 Observable을 반환(return)합니다.
  // 지금 방식에성 HeroService가 Observable을 Promise로 변환하고 호출자에게 Promise를 return함(최신 튜토리얼에선 그냥 Observable객체를 return함)

  // Observable은 배열과 비슷한 연산자로 처리할수있는 Angular의 이벤트 스트림입니다.
  // Angular core는 Observable을 기본적으로 지원합니다.(개발자는 RxJS Library의 연산자 및 확장 프로그램을 사용해 지원을 확대할수있음 - 최신 튜토리얼에 반영한듯)
  // HeroService는 toPromise 연산자를 http.get()의 Observable 결과에 연결 시켰습니다. 그 연산자는 Observable을 Primise로 변환했고 그 Promise를 호출자에게 다시 전달했음.

  // Hero서비스를 Promise로 만들기
  // Promise는 본질적으로 결과가 준비될 때 콜백 할것을 약속합니다. 비동기 Service작업을 수행하고 콜백 기능을 제공하도록 요청합니다.
  getHero(id: number): Promise<Hero> { // get-by-id형식으로 API에서 값을 받아옴
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.valueOf() as Hero)
      .catch(this.handleError);
  }

  getHeroes(): Promise<Hero[]> { // 비동기 연결 구축
    return this.http.get(this.heroesUrl)
      .toPromise() // http.get은 Observavble을 반환함(객체). 이 객체는 예전엔 toPromise를 제공 안해서 다른 모듈을 import해야했지만 지금은 제공해서 안해도됨
      .then(response => response.valueOf() as Hero[])
      .catch(this.handleError); // 에러 핸들링
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.put(url, hero, this.httpOptions) // put()을 사용하여 서버에 변경을 지속함
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, {name}, this.httpOptions)
      .toPromise()
      .then(res => res.valueOf() as Hero)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete(url, this.httpOptions)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
