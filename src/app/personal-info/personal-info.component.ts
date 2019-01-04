import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DetailsService } from '../details.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Observable } from 'rxjs';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


// import { LoginComponent } from '../login/login.component';

export interface Gender {
  code: string;
  desc: string;
}

// export interface Parents {
//   MembershipID: number;
//   lastName: string;
//   firstName: string;
//   middleName: string;
//   birthDate: string;
// }

// const ELEMENT_DATA: Parents[] = this.parents;

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  

  firstFormGroup; secondFormGroup; 
  thirdFormGroup; fourthFormGroup: FormGroup; 

  show; showSpinner: boolean = false;
  
  lastName; firstName; middleName; 
  genderCode; genderDesc; selectedGender; 
  selectedCivilStatus; IDname; add11; add12; 
  add13; add21; add22; add23; selectedCity1; 
  selectedCity2; postalAdd1; postalAdd2; 
  citySelect1; citySelect2;
  mobile1; mobile2; landline; email; 
  contactFullname; contactMobile; 
  contactLandline: string;

  EmployeeID; selectedPostalCity1; selectedPostalCity2
  selectedStructureType1; selectedOwnershipType1;
  selectedStructureType2; selectedOwnershipType2;
  selectedBloodType; selectedContactRelationship: number

  birthDate: Date;

  dialog: MatDialog;
  
  gender; civilStatus; 
  postalCity1; postalCity2;
  structureType1; structureType2;
  ownershipType1; ownershipType2;
  bloodTypes; contactRelationship;
  livingRelatives; parents; displayedColumns: any[] = [];
  
  

  constructor( private _formBuilder: FormBuilder, 
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private detailsService: DetailsService ) 
    {

      this.route.queryParams.subscribe(params => {
        this.EmployeeID = params['EmployeeID'];
        this.IDname = params['EmployeeIDName'];
        this.lastName = params['Surname'];
        this.firstName = params['FirstName'];
        this.lastName = params['Surname'];
        this.middleName = params['MiddleName'];
        this.birthDate = params['BirthDate'];
        this.selectedGender = params['Gender'];
        this.selectedCivilStatus = Number(params['CivilStatusID'] || 1);
        this.selectedPostalCity1 = Number(params['CityID11'] || 1);
        this.selectedPostalCity2 = Number(params['CityID21'] || 1);
        this.add11 = params['Address11'];
        this.add12 = params['Address12'];
        this.add13 = params['Address13'];
        this.add21 = params['Address21'];
        this.add22 = params['Address22'];
        this.add23 = params['Address23'];
        this.selectedStructureType1 = Number(params['StructureID11']);
        this.selectedStructureType2 = Number(params['StructureID21']);
        this.selectedOwnershipType1 = Number(params['OwnershipID11']);
        this.selectedOwnershipType2 = Number(params['OwnershipID21']);
        this.mobile1 = params['PersonalCellphone1'];
        this.mobile2 = params['PersonalCellphone2'];
        this.landline = params['PersonalLandline'];
        this.email = params['PersonalEmailAddress'];
        this.selectedBloodType = Number(params['BloodID'] || 9);
        this.contactFullname = params['EmergencyContactName'];
        this.contactMobile = params['EmergencyCellphone'];
        this.contactLandline = params['EmergencyLandline'];
        this.selectedContactRelationship = Number(params['EmergencyRelationshipID']);
      });
    }

  ngOnInit() {
    
    this.getSpecificPhilippineCity1(this.selectedPostalCity1);
    this.getSpecificPhilippineCity2(this.selectedPostalCity2);
    this.getListGender();
    this.getListCivilStatus(this.selectedCivilStatus);
    this.getListPhilippinesPostalCode();
    this.getStructureType1();
    this.getStructureType2();
    this.getOwnershipType1();
    this.getOwnershipType2();
    this.getBloodType();
    this.getContactRelationship();
    this.getFamilyMembersData(this.EmployeeID);
    this.getFamilyMembersDataParents(this.EmployeeID);

    setInterval(() => {
      this.showSpinner = false;
    }, 2000);

    this.firstFormGroup = this._formBuilder.group({
      frmCtrlLname: [this.lastName, Validators.nullValidator],
      frmCtrlFname: [this.firstName, Validators.nullValidator],
      frmCtrlMname: [this.middleName, Validators.nullValidator],
      frmCtrlDB: [this.birthDate, Validators.nullValidator],
      frmCtrlGender: [this.selectedGender, Validators.nullValidator],
      frmCtrlCivilStatus: [this.selectedCivilStatus, Validators.required],

      frmCtrlMobile1: [this.mobile1, Validators.required],
      frmCtrlMobile2: [this.mobile2, Validators.nullValidator],
      frmCtrlLandline: [this.landline, Validators.nullValidator],
      frmCtrlEmail: [this.email, Validators.nullValidator],
      frmCtrlCity1: ['', Validators.required],
      frmCtrlCity2: ['', Validators.required],
      frmCtrlBloodType: ['', Validators.nullValidator],
      frmCtrlContactFullname: [this.contactFullname, Validators.required],
      frmCtrlContactMobile: [this.contactMobile, Validators.required],
      frmCtrlContactLandline: [this.contactLandline, Validators.nullValidator],
      frmCtrlContactRelationship: ['', Validators.required],
      frmCtrlPostalAdd1: ['', Validators.nullValidator],
      frmCtrlPostalAdd2: ['', Validators.nullValidator],

      frmCtrlStructure1: ['', Validators.nullValidator],
      frmCtrlStructure2: ['', Validators.nullValidator],
      frmCtrlOwnershipType1: ['', Validators.nullValidator],
      frmCtrlOwnershipType2: ['', Validators.nullValidator],

      frmCtrlAddress11: [this.add11, Validators.required],
      frmCtrlAddress12: [this.add12, Validators.required],
      frmCtrlAddress13: [this.add13, Validators.required],
      frmCtrlAddress21: [this.add21, Validators.required],
      frmCtrlAddress22: [this.add22, Validators.required],
      frmCtrlAddress23: [this.add23, Validators.required]
    
    });

    
    // this.firstFormGroup.get('frmCtrlCity1').setValue(this.selectedPostalCity1);

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.nullValidator],
      frmCtrlMembership: ['', Validators.nullValidator],
      frmCtrlMembershipFather: ['', Validators.nullValidator],
      frmCtrlMembershipMother: ['', Validators.nullValidator]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.nullValidator]
    });

    // this.fourthFormGroup = this._formBuilder.group({
    //   fourthCtrl: ['', Validators.nullValidator]
    // }); // this.fourthFormGroup = this._formBuilder.group({
    //   fourthCtrl: ['', Validators.nullValidator]
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


  add1Change(event: any) {
    this.add11 = event.target.value;
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

  getListCivilStatus(civilStatus: number) {
    this.detailsService.getCivilStatusList(civilStatus).subscribe(data => {
      if(data) {
        this.civilStatus = data;
      }
    });
  }

  getListPhilippinesPostalCode() {
    return this.detailsService.getDistinctPhilippinePostalCodes().subscribe(data => {
      if(data) {

      this.postalCity1 = data;
      this.postalCity2 = data;
      }
    });
  }

  getSpecificPhilippineCity1(postalCode: number) {
    
    return this.detailsService.getSpecificPhilippinePostalCodes(postalCode).subscribe(data => {
      if(data) {

        this.selectedCity1 = data[0]['Area'];
       
        this.firstFormGroup.patchValue({
          frmCtrlCity1: this.selectedCity1
        });

        this.getPostalCode1(this.selectedCity1);
      }
     
    });
  }

  getSpecificPhilippineCity2(postalCode: number) {
   
    return this.detailsService.getSpecificPhilippinePostalCodes(postalCode).subscribe(data => {
      if(data) {

        this.selectedCity2 = data[0]['Area'];
       
        this.firstFormGroup.patchValue({
          frmCtrlCity2: this.selectedCity2
        });

        this.getPostalCode2(this.selectedCity2);
      }
      
    });
  }

  getPostalCode1(area: string) {
    return this.detailsService.getPhilippinePostalCodes(area).subscribe(data => {
      if(data) {
        // console.log(data);
        this.postalAdd1 = data;
        // this.selectedCity2 = data[0]['Area'];
       
        this.firstFormGroup.patchValue({
          frmCtrlPostalAdd1: this.selectedPostalCity1
        });
      }
    });
  }

  getPostalCode2(area: string) {
    return this.detailsService.getPhilippinePostalCodes(area).subscribe(data => {
      if(data) {
        
        this.postalAdd2 = data;
        
        this.firstFormGroup.patchValue({
          frmCtrlPostalAdd2: this.selectedPostalCity2
        });

      }
    });
  }

  getStructureType1() {
    return this.detailsService.getStructureType().subscribe(data => {
      if(data) {

        this.structureType1 = data;
        
        this.firstFormGroup.patchValue({
          frmCtrlStructure1: this.selectedStructureType1
        });

      }
    });
  }

  getStructureType2() {
    return this.detailsService.getStructureType().subscribe(data => {
      if(data) {

        this.structureType2 = data;
        
        this.firstFormGroup.patchValue({
          frmCtrlStructure2: this.selectedStructureType2
        });
        
      }
    });
  }

  getOwnershipType1() {
    return this.detailsService.getOwnershipType().subscribe(data => {
      if(data) {

        this.ownershipType1 = data;
        
        this.firstFormGroup.patchValue({
          frmCtrlOwnershipType1: this.selectedOwnershipType1
        });
        
      }
    });
  }

  getOwnershipType2() {
    return this.detailsService.getOwnershipType().subscribe(data => {
      if(data) {

        this.ownershipType2 = data;

        this.firstFormGroup.patchValue({
          frmCtrlOwnershipType2: this.selectedOwnershipType2
        });
      }
    });
  }

  getBloodType() {
    return this.detailsService.getBloodType().subscribe(data => {
      if(data) {
        this.bloodTypes = data;

        this.firstFormGroup.patchValue({
          frmCtrlBloodType: this.selectedBloodType
        });
      }
    });
  }

  getContactRelationship() {
    return this.detailsService.getContactRelationship().subscribe(data => {
      if(data) {
        this.contactRelationship = data;

        this.firstFormGroup.patchValue({
          frmCtrlContactRelationship: this.selectedContactRelationship
        });
      }
    });
  }

  getFamilyMembersData(id: any) {
    
    return this.detailsService.getFamilyMembersData(id).subscribe(data => {
      if(data) {
        this.livingRelatives = data;

        for (var i = 0; i < this.livingRelatives.length; i++) {
          switch(this.livingRelatives[i]['MembershipID']) {
            case 1:
              console.log('Father');

              break;
            case 2:
            console.log('Mother');

              break;
            default:
              console.log('No more data');
          }
        }
      }
      else {
        
        this.livingRelatives = [];
        console.log(this.livingRelatives);
      }
    });
  }

  getFamilyMembersDataParents(id: any) {
    
    return this.detailsService.getFamilyMembersDataParents(id).subscribe(data => {
      if(data) {

        this.displayedColumns = ['MembershipID', 'LastName', 'FirstName', 'MiddleName', 'BirthDate', 'Delete'];

        this.parents = data;

        console.log(this.parents);
        // for (var i = 0; i < this.parents.length; i++) {
        //     switch(this.parents[i]['MembershipID']) {
        //       case 1:
        //         this.secondFormGroup.patchValue({
        //           frmCtrlMembership: this.parents[i]['Membership']
        //         });
        //         break;
        //       case 2:
        //         this.secondFormGroup.patchValue({
        //           frmCtrlMembership: this.parents[i]['Membership']
        //         });
        //         break;
        //       default:
                
        //         break;
        //     }
        //   }

        // console.log(this.parents);
        
        //this.dataSource = this.parents;

      }
      else {
        // console.log('NO DATA FOUND!')
        this.parents = [];
        console.log(this.parents);
      }
    });
  }

  cityChange1(event: any) {
    this.citySelect1 = event['value'];
    this.selectedPostalCity1 = null;
    this.getPostalCode1(this.citySelect1);
  }

  cityChange2(event: any) {
    this.citySelect2 = event['value'];
    this.selectedPostalCity2 = null;
    this.getPostalCode2(this.citySelect2);
  }

  postalChange1(event: any) {
    this.selectedPostalCity1 = event['value'];
  }

  postalChange2(event: any) {
    this.selectedPostalCity2 = event['value'];
  }

  btnDeleteClick(event: any) {
    // var x = event
    // console.log(x);
    var x = event['MembershipID'] || 1
    //console.log(event['MembershipID']);


    for (var i in this.parents) {
      if (this.parents[i].MembershipID == x) {
        this.parents[i].LastName = "";
        this.parents[i].FirstName = "";
        this.parents[i].MiddleName = "";
        this.parents[i].BirthDate = "";
         break; //Stop this loop, we found it!
      }

      this.parents = new MatTableDataSource(this.parents);

    }

  }

}

