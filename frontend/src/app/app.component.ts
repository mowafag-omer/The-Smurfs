import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  isLoged = localStorage.getItem('token') || null
  
  ngDoCheck(): void {
    this.isLoged = localStorage.getItem('token') || null
  }

  signout() {
    localStorage.removeItem('token');
    this.isLoged = null
  }
}
