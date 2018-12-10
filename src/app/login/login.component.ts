import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DetailsService } from '../details.service';
import * as moment from 'moment';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public show: boolean = false;
  data: any [];

  public id: number;
  public tin: number;
  public db: Date;
  constructor( 
    private router: Router,
    private detailsService: DetailsService,
    public dialog: MatDialog
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
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "firstName": data[0]['FirstName'],
            "lastName": data[0]['Surname'],
            "middleName": data[0]['MiddleName'],
            "birthDate": data[0]['BirthDate']
          }
        }

        this.router.navigate(['personalInfo'], navigationExtras);

      } else {
        this.openDialog();
        return;
      }
    })
    
  } 

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
