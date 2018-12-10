import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
  isOptional = false;
  public show: boolean = false;
  breakpoint: number;
  public firstName: string;
  public lastName: string;
  public middleName: string;
  public birthDate: Date;
  public dialog: MatDialog

  constructor( private _formBuilder: FormBuilder, 
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private route: ActivatedRoute ) 
    {

      this.route.queryParams.subscribe(params => {
        this.firstName = params['firstName'];
        this.lastName = params['lastName'];
        this.middleName = params['middleName'];
        this.birthDate = params['birthDate'];
      });
    }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      frmCtrlLname: [this.lastName, Validators.required],
      frmCtrlFname: [this.firstName, Validators.required],
      frmCtrlMname: [this.middleName, Validators.nullValidator],
      frmCtrlDB: [this.birthDate, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    // this.fourthFormGroup = this._formBuilder.group({
    //   frmCtrlLname: [this.lastName, Validators.required],
    //   frmCtrlFname: [this.firstName, Validators.required],
    //   frmCtrlMname: [this.middleName, Validators.nullValidator]
    // });
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
  
}
