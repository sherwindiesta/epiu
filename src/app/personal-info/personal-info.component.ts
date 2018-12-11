import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DetailsService } from '../details.service';
import { LoginComponent } from '../login/login.component';

export interface Gender {
  code: string;
  desc: string;
}


@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  public show: boolean = false;
  public firstName: string;
  public lastName: string;
  public middleName: string;
  public birthDate: Date;
  public dialog: MatDialog;
  public genderCode: string;
  public genderDesc: string;
  public gender: string;
  public selectedGender: string;
  public maritalStatus: any = [];
  public selectedMarital: string;
  public IDname: string;
 
  
  constructor( private _formBuilder: FormBuilder, 
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private detailsService: DetailsService,
    private login: LoginComponent ) 
    {

      this.route.queryParams.subscribe(params => {
        this.firstName = params['FirstName'];
        this.lastName = params['Surname'];
        this.middleName = params['MiddleName'];
        this.birthDate = params['BirthDate'];
        this.selectedGender = params['Gender'];
        this.selectedMarital = params['MaritalStatus'];
        //this.IDname = params['EmployeeID'] + " - " + params['FullName'];
        this.IDname = params['EmployeeID'] + " - " + this.login.fullName;
      });
      this.getListGender();
      this.getListMaritalStatus();
    }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      frmCtrlLname: [this.lastName, Validators.required],
      frmCtrlFname: [this.firstName, Validators.required],
      frmCtrlMname: [this.middleName, Validators.nullValidator],
      frmCtrlDB: [this.birthDate, Validators.required],
      frmCtrlGender: [this.selectedGender, Validators.required],
      frmCtrlMarital: [this.selectedMarital, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  dataChange(event: any) {
    
    this.lastName = event.target.value;
    console.log(this.lastName);

    if(event.target.birthDate) {
      var date = moment(event.target.value);
      if(date.isValid() === false) {
        this.openDialog();
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  getListGender() {
    this.detailsService.getGenderList().subscribe(data => {
      if(data) {
        this.gender = [data][0]
      }
    });
  }

  getListMaritalStatus() {
    this.detailsService.getMaritalStatusList().subscribe(data => {
      if(data) {
        this.maritalStatus = data;     
      }
    });
  }
}

