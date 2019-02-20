import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogConfig } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'

// import { DialogAddNewFamilyMemberComponent } from '../dialog-add-new-family-member/dialog-add-new-family-member.component';

// import { PersonalInfoComponent } from '../personal-info/personal-info.component';


@Component({
  selector: 'app-dialog-select-parent',
  templateUrl: './dialog-select-parent.component.html',
  styleUrls: ['./dialog-select-parent.component.css']
})
export class DialogSelectParentComponent implements OnInit {

  id: string;
  description: string;
  data = [];
  father = false;
  mother = false;  
  disabledF = false;
  disabledM = false;

  lastName: string = "";
  firstName: string = "";
  middleName: string = "";
  birthDate: Date;
  

  // @Input() parents: Object;
  // @Output() updateParentsChange: EventEmitter<Object> = new EventEmitter<Object>();

  parentForm: FormGroup; 

  constructor(
    private _formBuilder: FormBuilder,
    // public personalInfoComponent: PersonalInfoComponent, 
    public dialogRef: MatDialogRef<DialogSelectParentComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData,
    private router: Router,
    public dialog: MatDialog
  ) 
  {
    this.description = dialogData.description
    this.data = dialogData.data;
    this.id = dialogData.id;
  }
    



  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  ngOnInit() {
    if(this.data.length === 1) {
      if(this.data[0]['Membership'] === "Father") {
        this.disabledM = false;
        this.disabledF = true; 
      }
      else if(this.data[0]['Membership'] === "Mother") {
        this.disabledF = false;
        this.disabledM = true;
      }
    }
    else {
  
      this.disabledF = false;
      this.disabledM = false;
    }

    this.parentForm = this._formBuilder.group({
      parentLastName: ['', Validators.required],
      parentFirstName: ['', Validators.required],
      parentMiddleName: ['', Validators.required],
      parentBirthdate: ['', Validators.required]
    });

    

  }

  btnOKClick() {
    if(this.father === true && this.mother === false) {
      this.addNewParentEntry("Father", 1);
    }
    
    else if(this.father === false && this.mother === true) {
      this.addNewParentEntry("Mother", 2);
    }
    
    else if(this.father === true && this.mother === true) {
      
      for (var i = 1; i < 3 ; i++) {
 
        if(i === 1) {
          this.addNewParentEntry("Father", i)
        }

        if(i === 2) {
          this.addNewParentEntry("Mother", i)
        }
      }
    }
    else {
      return;
    }
 
    this.onNoClick(this.data);

  }




  addNewParentEntry(parent, parentID) {
    var newEntry = { 
      "BirthDate": this.birthDate,
      "EmployeeID": this.id,
      "FirstName": this.firstName,
      "ID": "",
      "LastName": this.lastName,
      "Membership": parent,
      "MembershipID": parentID,
      "MiddleName": this.middleName,
      "Status": true
    }
    this.data = [...this.data, newEntry];
  }

  updateParent(type: any, event: any) {
    console.log(type)
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
        
        this.birthDate = event.target.value
        
        this.parentForm.patchValue({
          parentBirthdate: event.target.value
        })
        break;

      default:
        break;
    }
  }
  
}
