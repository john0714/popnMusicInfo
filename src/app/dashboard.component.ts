import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
})

export class DashboardComponent implements OnInit {
  heroes: Hero[] = []; // heroes 프로퍼티를 정의

  constructor(
    private heroService: HeroService
  ) { } // 생성자에서 HeroService를 주입받고 private heroService필드에 할당

  ngOnInit(): void { // ngOnInit() 라이프 사이클 후크에서 Service를 호출하여 Heroes을 얻습니다.
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5)); // Array.slice메소드로 4명의 Hero들을 지정
  }
}
