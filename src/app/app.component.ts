import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet> <!-- Router에 Component를 표시할 위치를 알려주기 위함 -->
  `,
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Tour of Heroes - Kim';
}
