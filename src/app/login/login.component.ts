import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DetailsService } from '../details.service';
import * as moment from 'moment';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public show: boolean = false;
  data: any [];

  public id: number;
  public tin: number;
  public db: Date;
  constructor( 
    private router: Router,
    private detailsService: DetailsService
  ) { }
  
  ngOnInit() {
    this.show = false;
    this.id = this.id;
    this.tin = this.tin;
    this.db = this.db;
  }

  btnClick() {
    this.detailsService.getDetails(this.id, this.tin, moment(this.db).format('L')).subscribe(data => {
      if(data !== 'Invalid login') {
        //console.log(data[0]['FirstName'])

        let navigationExtras: NavigationExtras = {
          queryParams: {
            "firstName": data[0]['FirstName'],
            "lastName": data[0]['Surname'],
            "middleName": data[0]['MiddleName']
          }
        }

        this.router.navigate(['personalInfo'], navigationExtras);

      } else {
        console.log(data);
        return;
      }
    })
    
  } 

}
