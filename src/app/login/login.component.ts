import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DetailsService } from '../details.service';
import * as moment from 'moment';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
  fullName: string;
  error: Error;

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
    this.detailsService.getDetails(this.id, this.tin, moment(this.db).format('L'))
    .subscribe(data => {
      if(data !== 'Invalid login') {

        this.fullName = data[0]['FullName']
        console.log(this.fullName);
        this.detailsService.getEmployeeData(this.id).subscribe(data => {
          if(data !== 'Invalid Data') {

            let navigationExtras: NavigationExtras = {
              queryParams: data[0] 
            }

              this.router.navigate(['personalInfo'], navigationExtras)
            }
        });

        // let navigationExtras: NavigationExtras = {
        //   queryParams: data[0]
        // }

        // this.router.navigate(['personalInfo'], navigationExtras)

      } else {
        this.openDialog('Invalid login');
        return;
      }
    }, error => {
      this.error = error
      this.openDialog(error);
    });
  } 

  openDialog(message): void {
    console.log(message);
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      description: message,
      width: '250px'
    };

    //this.dialog.open(DialogMessageComponent, dialogConfig);

    const dialogRef = this.dialog.open(DialogMessageComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
