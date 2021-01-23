import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject, of } from 'rxjs';

import { HeroSearchService } from '../../services/hero-search.service';
import { Hero } from '../hero';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>(); // 검색어

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void { // heroes property 초기화(ngOnInit)
    this.heroes = this.searchTerms.pipe(
      debounceTime(300), // wait 300ms after each keystroke before considering the term
      distinctUntilChanged(), // ignore if next search term is same as previous
      switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.heroSearchService.search(term)
        // or the observable of empty heroes if there was no search term
        : of<Hero[]>([])),
      catchError(error => {
          // TODO: add real error handling
          console.log(error);
          return of<Hero[]>([]);
      })
    );
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
