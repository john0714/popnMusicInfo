import { Component } from '@angular/core';

@Component({
  selector: 'side-menu',
  template: `
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
      <a routerLink="/newPage1" routerLinkActive="active">새 페이지1</a>
      <a routerLink="/newPage2" routerLinkActive="active">새 페이지2</a>
    </nav>
    <router-outlet></router-outlet> <!-- Router에 Component를 표시할 위치를 알려주기 위함 -->
  `,
  styleUrls: ['./side-menu.component.css'],
})

export class SideMenuComponent {
}
