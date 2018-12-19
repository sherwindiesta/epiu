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
import { SpinnerComponent } from '../spinner/spinner.component';
// import { LoginComponent } from '../login/login.component';

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
  
  firstFormGroup; secondFormGroup; thirdFormGroup; fourthFormGroup: FormGroup;
  
  public show; showSpinner: boolean = false;
  
  public lastName; firstName; middleName; 
  genderCode; genderDesc; selectedGender; 
  selectedMarital; selectedPostalCity1; 
  selectedPostalCity2; IDname; add11; add12; 
  add13; add21; add22; add23: string;

  public birthDate: Date;
  public dialog: MatDialog;
  public gender; maritalStatus; postalCity1; postalCity2: any = [];
  
  constructor( private _formBuilder: FormBuilder, 
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private detailsService: DetailsService ) 
    {

      this.route.queryParams.subscribe(params => {
        console.log(params);
        this.IDname = params['EmployeeIDName']
        this.firstName = params['FirstName'];
        this.lastName = params['Surname'];
        this.middleName = params['MiddleName'];
        this.birthDate = params['BirthDate'];
        this.selectedGender = params['Gender'];
        this.selectedMarital = params['MaritalStatus'];
        this.add11 = params['Address11'];
        this.add12 = params['Address12'];
        this.add13 = params['Address13'];
        this.add21 = params['Address21'];
        this.add22 = params['Address22'];
        this.add23 = params['Address23'];
        this.selectedPostalCity1 = params['CityID11'];
        this.selectedPostalCity2 = params['CityID21'];
        console.log(this.selectedPostalCity1)
        // this.IDname = params['EmployeeID'] + " - " + params['FullName'];
        // this.IDname = params['EmployeeID'] + " - " + this.login.fullName;
      });
      this.getListGender();
      this.getListMaritalStatus();
      this.getListPhilippinesPostalCode();
    }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      frmCtrlLname: [this.lastName, Validators.required],
      frmCtrlFname: [this.firstName, Validators.required],
      frmCtrlMname: [this.middleName, Validators.nullValidator],
      frmCtrlDB: [this.birthDate, Validators.required],
      frmCtrlGender: [this.selectedGender, Validators.required],
      frmCtrlMarital: [this.selectedMarital, Validators.required],
      frmCtrlCity1: [this.selectedPostalCity1, Validators.nullValidator],
      frmCtrlCity2: [this.selectedPostalCity2, Validators.nullValidator],
      frmCtrlAddress11: [this.add11, Validators.nullValidator],
      frmCtrlAddress12: [this.add12, Validators.nullValidator],
      frmCtrlAddress13: [this.add13, Validators.nullValidator],
      frmCtrlAddress21: [this.add21, Validators.nullValidator],
      frmCtrlAddress22: [this.add22, Validators.nullValidator],
      frmCtrlAddress23: [this.add23, Validators.nullValidator]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });

    setInterval(() => {
      this.showSpinner = false;
    }, 1000);
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
        this.gender = data;
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

  getListPhilippinesPostalCode() {
    this.detailsService.getPhilippinePostalCodes().subscribe(data => {
      if(data) {
        this.postalCity1 = data;
        this.postalCity2 = data;
      }
    }).unsubscribe();
  }
}

