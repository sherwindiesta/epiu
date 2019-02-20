import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EPIU';
  checked = false;
  public isIEOrEdge: boolean = false;
  agreed: boolean = false;

  public show: boolean = true;

  constructor( private router: Router ) { }

  ngOnInit() {
    this.show = true;
    this.router.navigate([''])

    this.isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent)

    // console.log(isIEOrEdge);

    // console.log(window.navigator.userAgent);

  }

  btnIagreeClick() {
    // if(this.checked) {
      this.show = false;
      this.router.navigate(['login']);
    // }
  } 

  
}

