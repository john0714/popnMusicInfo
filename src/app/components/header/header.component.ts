import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>{{title}}</h1>
    </div>
    <side-menu></side-menu>
  `,
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent {
  title = 'pop\'n music user info';
}
