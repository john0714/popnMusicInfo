import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../../services/hero.service';
import { Router } from '@angular/router';

// this is angular/core decorator template
// Component의 메타 데이터들 - selector, template, styles, provider
// 이중 중괄호는 Angular의 Interpolation 바인딩 구문. -> React-JSX의 {}와 비슷
// ngModel을 사용하여 양방향 바인딩을 구현함. 데이터는 Property에서 텍스트 상자로, 텍스트상자에서 Property로 양 방향으로 흐름
@Component({
  selector: 'app-my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]
})

export class HeroesComponent implements OnInit {
  selectedHero: Hero; // AppComponentクラスで、ComponentのheroプロパティがHeroタイプにrefactoringされ、id = 1, name = Windstormに初期化されます。
  heroes: Hero[]; // Create public property for viewing HEROES(Heroes 항목 지정. heroes = Hero[]하면 값을 넣어는 의미가 되서 초기 데이터 없다고 Lint에러 뜨므로 「:」를 씀)
  // typeScript에서「:」은 형식의 체크 및 지정을 해주는 명령. 따라서 위에선 단순히 Hero라는 배열이란 것을 heroes변수에 지정한다는 의미가 된다.

  // 생성자 작성 - 이제 Angular는 AppComponent를 생성할 때 HeroService의 인스턴스를 제공하는 것을 알고있음.
  constructor(
    private router: Router,
    private heroService: HeroService) { }

  // 서비스 호출(promise방식)
  getHeroes(): void {
    this.heroService.getHeroes().then(h => this.heroes = h);
  }

  // Angular에서 getHeroes()를 사용하게 하기 위해 Angular ngOnInit라이프 사이클 훅을 구현할 수 있음
  // Component 라이프 사이클의 중요한 순간(생성, 변경, 최종파괴)의 작업을 의한 인터페이스를 제공함
  ngOnInit(): void {
    this.getHeroes();
  }

  // create select Handler function
  onSelect(hero: Hero): void { // return type void mean no data type - do not return any value
    this.selectedHero = hero;
  }

  // Router의 navigate()메소드에서 호출할 getDetail()메소드를 구현
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  }
}
