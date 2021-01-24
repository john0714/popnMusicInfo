import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { FormsModule } from '@angular/forms'; // ngModule은 FormsModule에 포함되 있으므로, FormsModule을 Import해서 사용
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component'; // 모든 컴포넌트는 하나의(그리고 오직 한번만) Angular모듈로 선언되어야함.
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroService } from './services/hero.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';

@NgModule({
  // 일반적으로 declarations배열은 모듈에 속한 Component, Pipe 및 Directive응용 프로그램 목록을 포함함.(자세한건 NgModules가이드 참고)
  // 다른 Component가 참조하기 전에 Component를 모듈에서 선언해야함
  declarations: [
    HeaderComponent,
    SideMenuComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // 앱의 어느곳에서나 http서비스에 접근할 수 있게하기 위해 AppModule의 import에 HttpClinetModule(over Angular7)을 추가
    InMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
      ),
    AppRoutingModule,
  ],
  providers: [
    HeroService
  ], // providers는 Angular에게 SideMenuComponent 생성할 때 HeroService의 새로운 인스턴스를 생성하도록 지시함
  bootstrap: [
    HeaderComponent
  ]
})
export class AppModule { }
