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
import { Observable, throwError, empty } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public show: boolean = false;
  public newHire: boolean = false;
  public submitted: boolean = false;
  public selectedDivisionDepartment: string = "";
  data: any [];

  public id: number = null;
  public tin: number = null;
  public db: Date = null;
  fullname: string = null;
  name: string = null;
  department: string = null;
  departmentList: any [];
  error: Error;
  loginForm: FormGroup;

  public showSpinner: boolean = true;
  
  
  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private detailsService: DetailsService,
    public dialog: MatDialog
  ) { }
  
  ngOnInit() {
    this.show = false;
    this.id = this.id;
    this.tin = this.tin;
    this.db = this.db;
    //this.submitted = false;
    this.getDivisionDepartmentList();

    if(this.newHire) {
      this.loginForm = this.formBuilder.group({
        employeeID: ['', Validators.required],
        birthDate: ['', Validators.required],
        fullname: ['', Validators.required],
        department: ['', Validators.required]
      });
    }
    else {
      this.loginForm = this.formBuilder.group({
        employeeID: ['', Validators.required],
        birthDate: ['', Validators.required],
        fullname: ['', Validators.nullValidator],
        department: ['', Validators.nullValidator]
      });
    }
    

    setInterval(() => {
      this.showSpinner = false;
    }, 1000);

    
  }

  btnClick() {

    this.submitted = true;

    if(!this.newHire) {
      // this.detailsService.getDetails(this.id, this.tin, moment(this.db).format('L'))
      this.detailsService.getDetails(this.id, moment(this.db).format('L'))
      .subscribe(data => {
        if(data == 'Invalid login' ||  data == 'Invalid Data') {
          this.openDialog('Invalid Login / No Record Found');
          this.submitted = false;
          return;
        }
        else {
          console.log(this.fullname)
          console.log(this.selectedDivisionDepartment)
          let navigationExtras: NavigationExtras = {
            queryParams: data[0] || { EmployeeID: this.id, BirthDate: this.db, newEmp: false }

            // queryParams: {data: JSON.parse(data[0]), id: this.id, db: this.db }
          }
          this.router.navigate(['personalInfo'], navigationExtras);
          this.submitted = false;
        }
      }, error => {
        this.error = error
        this.openDialog(error);
        this.submitted = false;
      });
    }
    //NEW HIRE
    else {


      if(this.id !== null) {
        if(this.db !== null) {
          let navigationExtras: NavigationExtras = {
            queryParams: { EmployeeID: this.id, BirthDate: this.db, newEmp: true, Fullname: this.name, DivisionDepartment: this.selectedDivisionDepartment }
          }
          this.router.navigate(['personalInfo'], navigationExtras);
          this.submitted = false;
        }
        else {
          this.openDialog('Invalid Login / No Record Found');
          this.submitted = false;
        }
      }
      else {
        this.openDialog('Invalid Login / No Record Found');
        this.submitted = false;
      }
    }
  } 

  btnClickNewHire() {
    let navigationExtras: NavigationExtras = {
      queryParams: []
    }

    this.router.navigate(['personalInfo'], navigationExtras);
    this.submitted = false;
  }

  openDialog(message): void {
  
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;

    

    dialogConfig.data = {
      id: 1,
      description: message,
      width: '250px'
    };

    // this.dialog.open(DialogMessageComponent, dialogConfig);

    const dialogRef = this.dialog.open(DialogMessageComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  enterBirthDate(event: any) {
    this.db = event.target.value;
    this.loginForm.patchValue({
      birthDate: this.db
    })
  }

  changeNewHire() {
    if(this.newHire) {
      this.loginForm = this.formBuilder.group({
        employeeID: ['', Validators.required],
        birthDate: ['', Validators.required],
        fullname: ['', Validators.required],
        department: ['', Validators.required]
      });
    }
    else {
      this.loginForm = this.formBuilder.group({
        employeeID: ['', Validators.required],
        birthDate: ['', Validators.required],
        fullname: ['', Validators.nullValidator],
        department: ['', Validators.nullValidator]
      });
    }
  }

  getDivisionDepartmentList() {
    this.detailsService.getDivisionDepartmentList().subscribe(data => {
      if(data) {
        this.departmentList = data;
      }
    });
  }

  departmentListChange(event) {
    this.selectedDivisionDepartment = event['value']
    this.loginForm.patchValue({
      department: event['value']
    });
  }
}
