import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from './hero.service';
import { switchMap } from 'rxjs/operators'; // switchMap 연산자를 가져와서 나중에 Observable매개 변수로 사용합니다.

// @Component Decorator는 Component의 Angular메타 데이터를 제공합니다. CSS선택자 이름인 hero-detail은 상위 Component의 템플릿 내에서 이 Component를 식별하는 엘리먼트 태그와 일치합니다.
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hero-detail', // CSS selector인 이 이름은 HeroDetailComponent를 나타내는 엘리먼트 태그 이름임<hero-detail></hero-detail>의 형태로 사용
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})

// 항상 다른곳에서 import하기 때문에 컴포넌트 클래스는 언제나 export해야 합니다.
export class HeroDetailComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  @Input() hero;

  ngOnInit(): void {
    this.route.paramMap.pipe( // use pipe for switchMap Upper Angular6
      // switchMap 연산자는 Observable 라우트 파라미터의 id를 HeroService.getHero()메소드의 결과인 새로운 Observable에 매핑합니다.
      // ActivatedRoute Service의 Observable paramMap에서 id 파라미터를 가져오고 hero Service를 사용해서 해당 id의 Hero를 가져옵니다.
      switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
    ).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }
}
