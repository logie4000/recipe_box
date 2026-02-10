import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_TITLE } from './app.config';
import { MenuComponent } from './menu/menu.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MenuComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = APP_TITLE;
}
