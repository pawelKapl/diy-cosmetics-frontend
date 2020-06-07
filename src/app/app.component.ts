import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'diy-cosmetics-frontend';

  userCheck() {
    let user = sessionStorage.getItem('authenticatedUser');
    if (user === null) {
      return false;
    } else {
      return true;
    }
  }
}
