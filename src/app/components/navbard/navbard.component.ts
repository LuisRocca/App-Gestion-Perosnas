import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbard',
  templateUrl: './navbard.component.html',
  styleUrls: ['./navbard.component.css']
})
export class NavbardComponent {

  constructor( private router: Router) {

  }
  goToCreate() {
    this.router.navigate(['/create'])
  }
}
