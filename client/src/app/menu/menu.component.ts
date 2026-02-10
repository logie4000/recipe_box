import { Component } from '@angular/core';
import { MenuItemComponent } from "./menu-item.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuItemComponent],
  templateUrl: './menu.component.html',
  styleUrls: [ '../app.component.css', './menu.component.css' ]
})
export class MenuComponent {

}
