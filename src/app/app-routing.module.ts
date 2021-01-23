import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

// 라우팅 모듈은 라우트(경로)를 변수로 가져옵니다. 변수는 나중에 모듈을 export할 경우 라우팅 모듈 패턴을 명확하게 합니다.
// 라우팅 모듈은 import에 RouterModule.forRoot(routes)를 추가합니다.
// declarations가 없습니다. declarations는 사용하는 모듈의 책임입니다.
// Guard Service가 있는 경우 라우팅 모듈은 모듈 providers를 추가합니다.
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes',     component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
