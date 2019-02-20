import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogConfig } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'
import * as moment from 'moment';
@Component({
  selector: 'app-dialog-add-new-family-member',
  templateUrl: './dialog-add-new-family-member.component.html',
  styleUrls: ['./dialog-add-new-family-member.component.css']
})
export class DialogAddNewFamilyMemberComponent implements OnInit {
  
  employeeID: string;
  data = [];
  description: string;
  lastName: string = "";
  firstName: string = "";
  middleName: string = "";
  birthDate: Date;
  newEntryForm: FormGroup; 


  constructor(
    private _formBuilder: FormBuilder,
    // public personalInfoComponent: PersonalInfoComponent, 
    public dialogRef: MatDialogRef<DialogAddNewFamilyMemberComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData,
    private router: Router,
    public dialog: MatDialog
  ) 
  {
    this.description = dialogData.description
    this.data = dialogData.data;
    this.employeeID = dialogData.id;
  }

  ngOnInit() {
    this.newEntryForm = this._formBuilder.group({
      newLastName: ['', Validators.required],
      newFirstName: ['', Validators.required],
      newMiddleName: ['', Validators.required],
      newBirthdate: ['', Validators.required]
    });
  }


  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  btnOKClick() {
    this.addNewEntry();
    this.onNoClick(this.data);
 
    
  }

  

  addNewEntry() {
    var newEntry = { 
      "BirthDate": this.birthDate,
      "EmployeeID": this.employeeID,
      "FirstName": this.firstName,
      "ID": "",
      "LastName": this.lastName,
      "Membership": this.description,
      "MembershipID": this.data.length + 1,
      "MiddleName": this.middleName,
      "Status": true
    }
    this.data = [...this.data, newEntry];
  }

  updateNewEntry(type: any, event: any) {
 
    switch (type) {
      case 'lastName':
        this.lastName = event.target.value;
        break;

      case 'firstName':
        this.firstName = event.target.value;
        break;
      
      case'middleName':
        this.middleName = event.target.value;
        break;


      case 'birthDate':
        this.birthDate = event.target.value;
        
        this.newEntryForm.patchValue({
          newBirthdate: event.target.value
        })

        break;

      default:
        break;
    }
  }
}
