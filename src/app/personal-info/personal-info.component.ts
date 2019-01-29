import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment';
import { DialogSelectParentComponent } from '../dialog-select-parent/dialog-select-parent.component';
import { DialogSelectEducationTypeComponent } from '../dialog-select-education-type/dialog-select-education-type.component';
import { DialogSelectAddLanguageComponent } from '../dialog-select-add-language/dialog-select-add-language.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { DetailsService } from '../details.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Observable, empty } from 'rxjs';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSlideToggleChange } from '@angular/material';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
// import { DialogMessageComponent } from '../dialog-message/dialog-message.component';

import { rowsAnimation } from '../template.animations';

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
  styleUrls: ['./personal-info.component.css'],
  animations: [rowsAnimation]
})
export class PersonalInfoComponent implements OnInit {
  
  
  

  dataSource; dataSourceParents; 
  dataSourceSiblings; dataSourceSpouse; 
  dataSourceChild; dataSourceEducationDetails;
  dataSourceLanguageSkills; dataSourceForeignLanguageSkills;
  dataSourceLocalLanguageSkills; dataSourceDeclaredOutsideInterest = new MatTableDataSource<Element>();
  
  firstFormGroup; secondFormGroup; 
  thirdFormGroup; fourthFormGroup: FormGroup; 

  show; showSpinner; parentsHide; 
  siblingsHide; spouseHide; 
  childHide; signLanguage; brailleSystem; 
  prc1; prc2; hideDeclaredOutsideInterest;
  skillsAgreed; toggleAddressChecked;
  agreed; brailleLevel1; brailleLevel2; brailleLevel3;
  signLanguageLevel1; signLanguageLevel2; 
  signLanguageLevel3: boolean = false;
  
  lastName; firstName; middleName; 
  genderCode; genderDesc; selectedGender; 
  selectedCivilStatus; IDname; add11; add12; 
  add13; add21; add22; add23; selectedCity1; 
  selectedCity2; postalAdd1; postalAdd2; 
  citySelect1; citySelect2;
  mobile1; mobile2; landline; email; 
  contactFullname; contactMobile; 
  contactLandline; origValueSelectedParent; selectedParent; 
  strPRCType1; strPRCNo1; strPRCExpiryDate1; 
  strPRCType2; strPRCNo2; strPRCExpiryDate2;
  targetPostalCode1; targetPostalCode2;
  targetStructureType1; targetStructureType2;
  targetOwnershipType1; targetOwnershipType2;
  targetContactRelationship; targetPRCtype1; targetPRCtype2;
  selectedLevelSignLanguageDesc; selectedLevelBrailleSysDesc: string;

  EmployeeID; selectedPostalCity1; selectedPostalCity2
  selectedStructureType1; selectedOwnershipType1;
  selectedStructureType2; selectedOwnershipType2;
  selectedBloodType; selectedContactRelationship;
  brailleLevel; signLanguageLevel: number
  
  disabledSignLanguage: boolean = true;
  disabledBraille: boolean = true;
  disabledConsentSkillsAgreed: boolean = true;

  birthDate: Date;
  
  gender; civilStatus; 
  postalCity1; postalCity2;
  structureType1; structureType2;
  ownershipType1; ownershipType2;
  bloodTypes; contactRelationship;
  livingRelatives; parents; siblings; spouse; child; 
  displayedColumns; displayedColumnsEducation;
  displayedColumnsLanguage; parentTypes; 
  educationDetails; prcTypes; 
  foreignLanguageSkills; localLanguageSkills; 
  otherSkills; foreignLanguage; localLanguage; 
  newLanguage; declaredOutsideInterest; 
  displayedColumnsDeclaredOutsideInterest;
  selectedOutsideInterest; optionsSchools: any[] = [];
  

  constructor( private _formBuilder: FormBuilder, 
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private detailsService: DetailsService,
    private changeDetectorRefs: ChangeDetectorRef,
    private loginComponent: LoginComponent,
    public dialog: MatDialog,
    private router: Router ) 
    {

      this.route.queryParams.subscribe(params => {
        this.EmployeeID = params['EmployeeID'] || "";
        this.IDname = params['EmployeeIDName'] || 'New Record';
        this.lastName = params['Surname'];
        this.firstName = params['FirstName'];
        this.lastName = params['Surname'];
        this.middleName = params['MiddleName'];
        this.birthDate = params['BirthDate'];
        this.selectedGender = params['Gender'];
        this.selectedCivilStatus = Number(params['CivilStatusID'] || 1);
        this.selectedPostalCity1 = Number(params['CityID11'] || 1);
        this.selectedPostalCity2 = Number(params['CityID21'] || 1);
        this.add11 = params['Address11'] || "";
        this.add12 = params['Address12'] || "";
        this.add13 = params['Address13'] || "";
        this.add21 = params['Address21'] || "";
        this.add22 = params['Address22'] || "";
        this.add23 = params['Address23'] || "";
        this.selectedStructureType1 = Number(params['StructureID11']);
        this.selectedStructureType2 = Number(params['StructureID21']);
        this.selectedOwnershipType1 = Number(params['OwnershipID11']);
        this.selectedOwnershipType2 = Number(params['OwnershipID21']);
        this.mobile1 = params['PersonalCellphone1'] || "";
        this.mobile2 = params['PersonalCellphone2'] || "";
        this.landline = params['PersonalLandline'] || "";
        this.email = params['PersonalEmailAddress'] || "";
        this.selectedBloodType = Number(params['BloodID'] || 9);
        this.contactFullname = params['EmergencyContactName'];
        this.contactMobile = params['EmergencyCellphone'];
        this.contactLandline = params['EmergencyLandline'] || "";
        this.selectedContactRelationship = Number(params['EmergencyRelationshipID']);
        this.strPRCType1 = Number(params['PRCType'] || 0);
        this.strPRCType2 = Number(params['PRCType2'] || 0);
        this.strPRCNo1 = params['PRCNo'] || "";
        this.strPRCNo2 = params['PRCNo2'] || "";
        this.strPRCExpiryDate1 = params['PRCExpiry'] || "";
        this.strPRCExpiryDate2 = params['PRCExpiry2'] || "";
      });

      
    }

  ngOnInit() {
    
    this.parents = [];
    this.siblings = [];
    this.child = [];
    this.spouse = [];

    this.educationDetails = [];
    this.foreignLanguageSkills = [];
    this.localLanguageSkills = [];
    this.otherSkills = [];
    this.declaredOutsideInterest = [];
    this.targetPostalCode1 = "";
    this.targetPostalCode2 = "";
    this.targetStructureType1 = "";
    this.targetStructureType2 = "";
    this.targetOwnershipType1 = ""; 
    this.targetOwnershipType2 = "";
    this.dataSourceParents = [];
    this.dataSourceSiblings = [];
    this.dataSourceEducationDetails = [];

    this.selectedLevelSignLanguageDesc = ""; 
    this.selectedLevelBrailleSysDesc = "";
    
    this.skillsAgreed = false;
    


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
    // this.getFamilyMembersData(this.EmployeeID);
    this.getFamilyMembersDataParents(this.EmployeeID);
    this.getFamilyMembersDataParentsType();
    this.getFamilyMembersDataSiblings(this.EmployeeID);
    this.getFamilyMembersDataSpouse(this.EmployeeID);
    this.getFamilyMembersDataChild(this.EmployeeID);
    this.getEducationDetails(this.EmployeeID);
    this.getForeignLanguageSkills(this.EmployeeID);
    this.getLocalLanguageSkills(this.EmployeeID);
    this.getOtherSkills(this.EmployeeID);
    this.getPRCTypes();
    this.getDeclaredOutsideInterest(this.EmployeeID);
  

    // setInterval(() => {
    //   this.showSpinner = false;

    // }, 2000);

    // this.rateControl = new FormControl("", [Validators.max(100), Validators.min(0)])

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

      frmCtrlAddress11: [this.add11 || null, Validators.required],
      frmCtrlAddress12: [this.add12, Validators.required],
      frmCtrlAddress13: [this.add13, Validators.required],
      frmCtrlAddress21: [this.add21 || null, Validators.required],
      frmCtrlAddress22: [this.add22, Validators.required],
      frmCtrlAddress23: [this.add23, Validators.required]
    
    });

    
    // this.firstFormGroup.get('frmCtrlCity1').setValue(this.selectedPostalCity1);

    this.secondFormGroup = this._formBuilder.group({
      // secondCtrl: ['', Validators.nullValidator],
      frmCtrlMembership: ['', Validators.nullValidator],
      frmCtrlMembershipFather: ['', Validators.nullValidator],
      frmCtrlMembershipMother: ['', Validators.nullValidator],
      frmCtrlParents: ['', Validators.nullValidator]
    });
    this.thirdFormGroup = this._formBuilder.group({
      // thirdCtrl: ['', Validators.nullValidator]
      frmCtrlPRClicense1: [this.strPRCNo1, Validators.nullValidator],
      frmCtrlPRCtype1: [this.strPRCType1, Validators.nullValidator],
      frmCtrlExpDate1: [moment(this.strPRCExpiryDate1).format('L'), Validators.nullValidator],
      frmCtrlPRClicense2: [this.strPRCNo2, Validators.nullValidator],
      frmCtrlPRCtype2: [this.strPRCType2, Validators.nullValidator],
      frmCtrlExpDate2: [moment(this.strPRCExpiryDate2).format('L'), Validators.nullValidator],
      frmCtrlSignLanguage: ['', Validators.nullValidator],  
      frmCtrlBrailleSystem: ['', Validators.nullValidator]
      
    });
    this.fourthFormGroup = this._formBuilder.group({
      frmCtrlOutsideInterest: [false, Validators.nullValidator]
    })
    
    // this.fourthFormGroup = this._formBuilder.group({
    //   fourthCtrl: ['', Validators.nullValidator]
    // }); // this.fourthFormGroup = this._formBuilder.group({
    //   fourthCtrl: ['', Validators.nullValidator]
    // });
    // console.log(this.signLanguage);
    // console.log(this.selectedLevelSignLanguageDesc);

    // if(this.foreignLanguageSkills.length > 0 || this.localLanguageSkills.length > 0 
    //   || this.signLanguage && this.selectedLevelSignLanguageDesc 
    //   || this.brailleSystem && this.selectedLevelBrailleSysDesc ) {
      
    //     this.skillsAgreed = true;
    //     this.consentSkillsAgreed = true;
    // }
    
    
   
  }


  openDialogSelectParent() {

      const dialogConfig = new MatDialogConfig();
  
      dialogConfig.data = {
        id: this.EmployeeID,
        data: this.parents,
        width: '600px'
      };
  
      const dialogRef = this.dialog.open(DialogSelectParentComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.parents = result;
          this.dataSourceParents = new MatTableDataSource<Element>(result);
        }
      });
  }

  openDialogSelectEducation() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      id: this.EmployeeID,
      data: this.educationDetails,
      width: '600px'
    };

    const dialogRef = this.dialog.open(DialogSelectEducationTypeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.educationDetails = result;
        this.dataSourceEducationDetails = new MatTableDataSource<Element>(result);
        // console.log(this.educationDetails);
      }
    });

  }

  openDialogAddLanguage(data, type) {
  
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.data = {
      title: type,
      id: this.EmployeeID,
      data: data,
      width: '600px'
    };

    const dialogRef = this.dialog.open(DialogSelectAddLanguageComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

      var x = type
      if(result) {

        if (x === 'foreign') {
          
          this.foreignLanguageSkills = result;
          this.dataSourceForeignLanguageSkills = new MatTableDataSource<Element>(result);
    
        }
        else if (x === 'local') {
          this.localLanguageSkills = result;
          this.dataSourceLocalLanguageSkills = new MatTableDataSource<Element>(result);
        }

        if( this.foreignLanguageSkills.length > 0 || this.localLanguageSkills.length > 0) {
          this.disabledConsentSkillsAgreed = false;
        } else {
          this.disabledConsentSkillsAgreed = true;
        }

        
      }
    });

  }


  dataChange(type: any, event: any) {
    
    // this.lastName = event.target.value;
    
    // console.log(this.lastName);

    // if(event.target.birthDate) {
    //   var date = moment(event.target.value);
    //   if(date.isValid() === false) {
    //     // this.openDialog();
    //     this.loginComponent.openDialog("Invalid Birth Date");
    //   }
    // }



    // frmCtrlMobile1: [this.mobile1, Validators.required],
    //   frmCtrlMobile2: [this.mobile2, Validators.nullValidator],
    //   frmCtrlLandline: [this.landline, Validators.nullValidator],
    //   frmCtrlEmail: [this.email, Validators.nullValidator],
    //   frmCtrlCity1: ['', Validators.required],
    //   frmCtrlCity2: ['', Validators.required],
    //   frmCtrlBloodType: ['', Validators.nullValidator],
    //   frmCtrlContactFullname: [this.contactFullname, Validators.required],
    //   frmCtrlContactMobile: [this.contactMobile, Validators.required],
    //   frmCtrlContactLandline: [this.contactLandline, Validators.nullValidator],
    //   frmCtrlContactRelationship: ['', Validators.required],
    
    switch(type) {
      //START*************CONTACT DETAILS*****************
      case 'mobile1': {
        this.mobile1 = event.target.value
        this.firstFormGroup.patchValue({
          frmCtrlMobile1: event.target.value
        })
        break;
      }

      case 'mobile2': {
        this.mobile2 = event.target.value
        this.firstFormGroup.patchValue({
          frmCtrlMobile2: event.target.value
        })
        break;
      }

      case 'landline': {
        this.landline = event.target.value
        this.firstFormGroup.patchValue({
          frmCtrlLandline: event.target.value
        })
        break;
      }

      case 'email': {
        this.email = event.target.value
        this.firstFormGroup.patchValue({
          frmCtrlEmail: event.target.value
        })
        break;
      }

      // this.selectedBloodType = Number(params['BloodID'] || 9);
      //   this.contactFullname = params['EmergencyContactName'];
      //   this.contactMobile = params['EmergencyCellphone'];
      //   this.contactLandline = params['EmergencyLandline'];
      //   this.selectedContactRelationship = Number(params['EmergencyRelationshipID']);
  

      //END*************CONTACT DETAILS*****************

      //*************ADDRESS DETAILS*****************
      case 'add11': {
        if(this.toggleAddressChecked) {

          this.add11 = event.target.value
          this.add21 = event.target.value

          this.firstFormGroup.patchValue({
            frmCtrlAddress11: event.target.value,
            frmCtrlAddress21: event.target.value,
          })
        }
        else {
          this.add11 = event.target.value
          this.firstFormGroup.patchValue({
            frmCtrlAddress11: event.target.value
          })
        }
        break;
      }

      case 'add21': {
        this.add21 = event.target.value;

        this.firstFormGroup.patchValue({
          frmCtrlAddress21: event.target.value
        })
        break;
      }

      

      case 'add12': {
        if(this.toggleAddressChecked) {

          this.add12 = event.target.value
          this.add22 = event.target.value

          this.firstFormGroup.patchValue({
            frmCtrlAddress12: event.target.value,
            frmCtrlAddress22: event.target.value,
          })
        }
        else {
          this.add12 = event.target.value
          this.firstFormGroup.patchValue({
            frmCtrlAddress12: event.target.value
          })
        }

        break;
      } 

      case 'add22': {
        this.add22 = event.target.value;
        this.firstFormGroup.patchValue({
          frmCtrlAddress22: event.target.value
        })
        break;
      }

      case 'add13': {
        if(this.toggleAddressChecked) {

          this.add13 = event.target.value
          this.add23 = event.target.value

          this.firstFormGroup.patchValue({
            frmCtrlAddress13: event.target.value,
            frmCtrlAddress23: event.target.value,
          })
        }
        else {
          this.add13 = event.target.value
          this.firstFormGroup.patchValue({
            frmCtrlAddress13: event.target.value
          })
        }
        break;
      }

      case 'add23': {
        this.add23 = event.target.value;
        this.firstFormGroup.patchValue({
          frmCtrlAddress23: event.target.value
        })
        break;
      }

      case 'contactPerson': {
        this.contactFullname = event.target.value;
        this.firstFormGroup.patchValue({
          frmCtrlContactFullname: event.target.value
        })
        break;
      }

      case 'contactMobile': {
        this.contactMobile = event.target.value;
        this.firstFormGroup.patchValue({
          frmCtrlContactMobile: event.target.value
        })
        break;
      }

      case 'contactMobile': {
        this.contactMobile = event.target.value;
        this.firstFormGroup.patchValue({
          frmCtrlContactMobile: event.target.value
        })
        break;
      }

      case 'contactLandline': {
        this.contactLandline = event.target.value;
        this.firstFormGroup.patchValue({
          frmCtrlContactLandline: event.target.value
        })
        break;
      }

      case 'contactLandline': {
        this.contactLandline = event.target.value;
        this.firstFormGroup.patchValue({
          frmCtrlContactLandline: event.target.value
        })
        break;
      }

      default:
        break;
    }
  }


  toggleAddress(event: MatSlideToggleChange) {
    
    this.toggleAddressChecked = event.checked;
    if(this.toggleAddressChecked) {
      this.add21 = this.add11;
      this.add22 = this.add12;
      this.add23 = this.add13;

      this.selectedCity2 = this.selectedCity1,
      this.selectedPostalCity2 = this.selectedPostalCity1,
      this.selectedStructureType2 = this.selectedStructureType1,
      this.selectedOwnershipType2 = this.selectedOwnershipType1
      this.postalAdd2 = this.postalAdd1

      this.targetPostalCode2 = this.targetPostalCode1
      this.targetStructureType2 = this.targetStructureType1
      this.targetOwnershipType2 = this.targetOwnershipType1

      this.firstFormGroup.patchValue({
        frmCtrlAddress21: this.add11,
        frmCtrlAddress22: this.add12,
        frmCtrlAddress23: this.add13,
        frmCtrlCity2: this.selectedCity1,
        frmCtrlPostalAdd2: this.selectedPostalCity1,
        frmCtrlStructure2: this.selectedStructureType1,
        frmCtrlOwnershipType2: this.selectedOwnershipType1
      })

    }
  }

  add1Change(event: any) {
    console.log(event);
    this.add11 = event.target.value;
  }

  // openDialog(message): void {
  //   const dialogRef = this.dialog.open(DialogMessageComponent, {
  //     data: message,
  //     width: '250px'
  //   });

    

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }
  
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
        this.targetPostalCode1 = data[0]['Location'];
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
        this.targetPostalCode2 = data[0]['Location'];
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
        this.selectedCity1 = data[0].Area
        this.postalAdd1 = data;
        this.firstFormGroup.patchValue({
          frmCtrlPostalAdd1: this.selectedPostalCity1
        });
      }
    });
  }

  getPostalCode2(area: string) {
    return this.detailsService.getPhilippinePostalCodes(area).subscribe(data => {
      if(data) {
        this.selectedCity2 = data[0].Area
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
        for( let i = 0; i < data.length; i++) {
          if(data[i].ID === this.selectedStructureType1) {
            this.targetStructureType1 = data[i].Description
          }
        }

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
       
        for( let i = 0; i < data.length; i++) {
          if(data[i].ID === this.selectedStructureType2) {
            this.targetStructureType2 = data[i].Description
          }
        }

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
        
        for( let i = 0; i < data.length; i++) {
          if(data[i].ID === this.selectedOwnershipType1) {
            this.targetOwnershipType1 = data[i].Description
          }
        }

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

        for( let i = 0; i < data.length; i++) {
          if(data[i].ID === this.selectedOwnershipType2) {
            this.targetOwnershipType2 = data[i].Description
          }
        }

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

        for( let i = 0; i < data.length; i++) {
          if(data[i].ID === this.selectedContactRelationship) {
            this.targetContactRelationship = data[i].FamilyRelationship
          }
        }

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
       
      }
    });
  }


  getFamilyMembersDataParentsType() {
    return this.detailsService.getFamilyMembersDataParentsTypes().subscribe(data => {
      if(data) {
        this.parentTypes = data;
      }
    })
  }

  

  getFamilyMembersDataParents(id: any) {
    
    return this.detailsService.getFamilyMembersDataParents(id).subscribe(data => {
     
      if(data) {
        this.displayedColumns = ['Membership', 'LastName', 'FirstName', 'MiddleName', 'BirthDate', 'Delete'];
        this.parents = data;
        this.parentTypes = data;
        this.dataSourceParents = new MatTableDataSource<Element>(data);
      }


    });
  }

  getFamilyMembersDataSiblings(id: any) {
    
    return this.detailsService.getFamilyMembersDataSiblings(id).subscribe(data => {
     
      if(data) {
        
        this.displayedColumns = ['Membership', 'LastName', 'FirstName', 'MiddleName', 'BirthDate', 'Delete'];
        
        this.siblings = data;
        
        this.dataSourceSiblings = new MatTableDataSource<Element>(data);


      }

    });
  }


  getFamilyMembersDataSpouse(id: any) {
    
    return this.detailsService.getFamilyMembersDataSpouse(id).subscribe(data => {
      if(data) {
        
        this.displayedColumns = ['Membership', 'LastName', 'FirstName', 'MiddleName', 'BirthDate', 'Delete'];
        
        this.spouse = data;
        
        this.dataSourceSpouse = new MatTableDataSource<Element>(data);
      }

    });
  }


  getFamilyMembersDataChild(id: any) {
    
    return this.detailsService.getFamilyMembersDataChild(id).subscribe(data => {
      if(data) {
 
        this.displayedColumns = ['Membership', 'LastName', 'FirstName', 'MiddleName', 'BirthDate', 'Delete'];
        
        this.child = data;
        
        this.dataSourceChild = new MatTableDataSource<Element>(data);

        // this.secondFormGroup.patchValue({
        //   frmCtrlParents: this.parents
        // })
      }

    });
  }

  getEducationDetails(id) {
    return this.detailsService.getEducationDetails(id).subscribe(data => {
      if(data) {
        this.displayedColumnsEducation = ['LevelOfEducation', 'Level', 'SchoolName', 'ProgramDegree', 'SchoolAddress', 'YearStarted', 'YearEnded', 'Delete'];
        this.educationDetails = data;
        this.dataSourceEducationDetails = new MatTableDataSource<Element>(data);
      }
    });
  }


  getListOfSchoolNames(schoolName: string) {
    
    return this.detailsService.getListOfSchoolNames(schoolName).subscribe(data => {
      if(data) {
        this.optionsSchools = data;
      }
    })
  }


  cityChange1(event: any) {
    
    if(this.toggleAddressChecked) {
      this.citySelect1 = event['value'];
      this.selectedPostalCity1 = null;
      this.targetPostalCode1 = null
      this.getPostalCode1(this.citySelect1);
      
      this.citySelect2 = event['value'];
      this.targetPostalCode2 = null
      this.selectedPostalCity2 = null;
      this.getPostalCode2(this.citySelect2);
      
      this.firstFormGroup.patchValue({
        frmCtrlCity1: event['value'],
        frmCtrlCity2: event['value']
      });
    }
    else {
      this.citySelect1 = event['value'];
      this.selectedPostalCity1 = null;
      this.targetPostalCode1 = null
      this.getPostalCode1(this.citySelect1);
    }
  }

  cityChange2(event: any) {
    this.citySelect2 = event['value'];
    this.selectedPostalCity2 = null;
    this.targetPostalCode2 = null
    this.getPostalCode2(this.citySelect2);
  }

  postalChange1(event: any) {
    let postalChange1 = event.source.selected._element.nativeElement;
    
    if(this.toggleAddressChecked) {
      this.selectedPostalCity1 = event['value'];
      this.selectedPostalCity2 = event['value'];
      

      this.firstFormGroup.patchValue({
        frmCtrlPostalAdd1: event['value'],
        frmCtrlPostalAdd2: event['value']
      });
      this.getSpecificPhilippineCity1(event['value']);
      this.getSpecificPhilippineCity2(event['value']);

      this.targetPostalCode1 = postalChange1.innerText.trim();
      this.targetPostalCode2 = postalChange1.innerText.trim();
    }
    else {
      this.selectedPostalCity1 = event['value'];
      this.getSpecificPhilippineCity1(event['value']);
      this.targetPostalCode1 = postalChange1.innerText.trim();
    }
    
  }

  postalChange2(event: any) {
    let postalChange2 = event.source.selected._element.nativeElement;
    this.selectedPostalCity2 = event['value'];
    this.getSpecificPhilippineCity2(event['value']);
    this.targetPostalCode2 = postalChange2.innerText.trim();
  }

  bloodTypeChange(event: any) {
    this.selectedBloodType = event['value'];
    this.firstFormGroup.patchValue({
      frmCtrlBloodType: event['value']
    });
  }

  civilStatusChange(event: any) {
    this.selectedCivilStatus = event['value'];
    this.firstFormGroup.patchValue({
      frmCtrlCivilStatus: event['value']
    });
  }

  structureChange1(event: any) {
    let structureType1 = event.source.selected._element.nativeElement;

    if(this.toggleAddressChecked) {
      this.selectedStructureType1 = event['value'];
      this.selectedStructureType2 = event['value'];

      this.firstFormGroup.patchValue({
        frmCtrlStructure1: event['value'],
        frmCtrlStructure2: event['value']
      });

      this.targetStructureType1 =  structureType1.innerText.trim();
      this.targetStructureType2 =  structureType1.innerText.trim();

    }
    else {
      this.selectedStructureType1 = event['value'];
      this.targetStructureType1 =  structureType1.innerText.trim();
    }
  }

  structureChange2(event: any) {
    let structureType2 = event.source.selected._element.nativeElement;
    this.selectedStructureType2 = event['value'];
    this.targetStructureType2 =  structureType2.innerText.trim();
  }

  ownershipTypeChange1(event: any) {
    let ownerType1 = event.source.selected._element.nativeElement;

    if(this.toggleAddressChecked) {

      this.selectedOwnershipType1 = event['value'];
      this.selectedOwnershipType2 = event['value'];

      this.firstFormGroup.patchValue({
        frmCtrlOwnershipType1: event['value'],
        frmCtrlOwnershipType2: event['value']
      });
      this.targetOwnershipType1 =  ownerType1.innerText.trim();
      this.targetOwnershipType2 =  ownerType1.innerText.trim();
    }
    else {

      console.log(ownerType1.innerText.trim());
      this.selectedOwnershipType1 = event['value'];
      this.targetOwnershipType1 =  ownerType1.innerText.trim();
    }
  }
  
  ownershipTypeChange2(event: any) {
    let ownerType2 = event.source.selected._element.nativeElement;

    this.selectedOwnershipType2 = event['value'];
    this.targetOwnershipType2 =  ownerType2.innerText.trim();
  }
  
  
  parentChange(event: any) {
    this.selectedParent = event['value']
    for(var i = 0; i < this.parents.length; i++) {
      if(this.parents[i].Membership === this.selectedParent ) {
        this.loginComponent.openDialog("Oh oh, " + this.selectedParent + " " + "already selected!");
        event['value'] = this.origValueSelectedParent;
        this.selectedParent = this.origValueSelectedParent;
        return;
      }
    }
  }


  contactRelationshipChange(event: any) {
    let relationshipType = event.source.selected._element.nativeElement;
    this. targetContactRelationship = relationshipType.innerText.trim();

    this.selectedContactRelationship = event['value'];
    
    this.firstFormGroup.patchValue({
      frmCtrlContactRelationship: event['value'],
    });
  }

  parentClick(event: any) {

    this.getFamilyMembersDataParentsType();
    this.origValueSelectedParent = event.target['outerText'];

  }

  updateFamilyMembers(type: any, i: any, event: any) {
    switch(type) {
      case 'parentsLastName': 
        this.parents[i].LastName = event.target.value
        break;
      case 'parentsFirstName': 
        this.parents[i].FirstName = event.target.value
        break;
      case 'parentsMiddleName': 
        this.parents[i].MiddleName = event.target.value
        break;
      case 'parentsBirthDate': 
        this.parents[i].BirthDate = event.target.value;
        break;
      case 'siblingsLastName':
        this.siblings[i].LastName = event.target.value;
        break;
      case 'siblingsFirstName':
        this.siblings[i].FirstName = event.target.value;
        break;
      case 'siblingsMiddleName':
        this.siblings[i].MiddleName = event.target.value;
        break;
      case 'siblingsBirthDate':
        this.siblings[i].BirthDate = event.target.value;
        break;
      case 'spouseLastName':
        this.spouse[i].LastName = event.target.value;
        break;
      case 'spouseFirstName':
        this.spouse[i].FirstName = event.target.value;
        break;
      case 'spouseMiddleName':
        this.spouse[i].MiddleName = event.target.value;
        break;
      case 'spouseBirthDate':
        this.spouse[i].BirthDate = event.target.value;
        break;
      case 'childLastName':
        this.child[i].LastName = event.target.value;
        break;
      case 'childFirstName':
        this.child[i].FirstName = event.target.value;
        break;
      case 'childMiddleName':
        this.child[i].MiddleName = event.target.value;
        break;
      case 'childBirthDate':
        this.child[i].BirthDate = event.target.value;
        break;
      default:
        break;
    }
  }

  updateEducationSkills(type: any, i: any, event: any) {
   
    switch(type) {
      case 'schoolName':

        this.educationDetails[i].SchoolName = event.target.value
        this.getListOfSchoolNames(this.educationDetails[i].SchoolName);

        break;

      case 'programDegree': 
        this.educationDetails[i].ProgramDegree = event.target.value
        break;
      
      case 'schoolAddress': 
        this.educationDetails[i].SchoolAddress = event.target.value
        break;

      case 'yearStarted': 
        this.educationDetails[i].YearStarted = event.target.value
        break;

      case 'yearEnded': 
        this.educationDetails[i].YearEnded = event.target.value
        break;

      default:
        break;  
    }
  }

  optionSelectedSchool(i: any, name: any) {
    this.educationDetails[i].SchoolName = name;
  }


  onSelectedLocation(i: number, isSelected: boolean, schoolName: string): void {
    if (isSelected) {
      // console.log(schoolName);
      this.educationDetails[i].SchoolName = schoolName
        // setTimeout(() => {
        //   this.educationDetails[i].SchoolName.patchValue({location_id: locationId});
        //     this.userForm.get('location_name').setErrors(null);
        //     this.selectedLocationName = this.userForm.value.location_name;
        // }, 200);
    }
}

  PRC1TypeChange(event: any) {

    let prcType1 = event.source.selected._element.nativeElement;

    this.targetPRCtype1 = prcType1.innerText.trim();

    this.strPRCType1 = event['value'];
    
    this.thirdFormGroup.patchValue({
      frmCtrlPRCtype1: event['value']
    });

  }

  PRC2TypeChange(event: any) {

    let prcType2 = event.source.selected._element.nativeElement;

    this.targetPRCtype2 = prcType2.innerText.trim();

    this.strPRCType2 = event['value'];
    this.thirdFormGroup.patchValue({
      frmCtrlPRCtype2: event['value']
    });
  }

  updatePRClicense(type: any, event: any) {
   
    switch(type) {
      case 'prc1Update': 
        this.strPRCNo1 = event.target.value
        break;
  
      case 'prc2Update':
        this.strPRCNo2 = event.target.value
        break;

      case 'ExpDate1': 
        this.strPRCExpiryDate1 = event.target.value;
        this.thirdFormGroup.patchValue({
          frmCtrlExpDate1: this.strPRCExpiryDate1
        });
        break;

      case 'ExpDate2': 
        this.strPRCExpiryDate2 = event.target.value;
        this.thirdFormGroup.patchValue({
          frmCtrlExpDate2: this.strPRCExpiryDate2
        });
        break;

      default:
        break;  
    }
  }

  btnDeleteClick(type: string, event: any, index: any) {

    var x = event['MembershipID'] || "";

    switch(type) {
      case 'parents':
        for (var i = 0; i < this.parents.length; i++)
        if (this.parents[i].MembershipID === x) {
            this.parents.splice(i,1);
        }
       
        this.dataSourceParents = new MatTableDataSource<Element>(this.parents);
        break;

      case 'siblings':
        for (var i = 0; i < this.siblings.length; i++)
        if (this.siblings[i].MembershipID === x) {
            this.siblings.splice(i,1);
        }
        
        this.dataSourceSiblings = new MatTableDataSource<Element>(this.siblings);
        break;

      case 'spouse':
        for (var i = 0; i < this.spouse.length; i++)
        if (this.spouse[i].MembershipID === x) {
            this.spouse.splice(i,1);
        }
       
        this.dataSourceSpouse = new MatTableDataSource<Element>(this.spouse);
        break;

      case 'child':
        for (var i = 0; i < this.child.length; i++)
        if (this.child[i].MembershipID === x) {
            this.child.splice(i,1);
        }
       
        this.dataSourceChild = new MatTableDataSource<Element>(this.child);
        break;
      
      case 'education':
        for (var i = 0; i < this.educationDetails.length; i++) {
          var idx = this.educationDetails.indexOf(this.educationDetails[i]);

          if(idx === index) {
            this.educationDetails.splice(index, 1)
          }
        }
       
        this.dataSourceEducationDetails = new MatTableDataSource<Element>(this.educationDetails);
        break;
      
      case 'foreignLanguage': 
        for (var i = 0; i < this.foreignLanguageSkills.length; i++) {
          var idx = this.foreignLanguageSkills.indexOf(this.foreignLanguageSkills[i]);

          if(idx === index) {
            this.foreignLanguageSkills.splice(index, 1)
          }
        }
        
        this.dataSourceForeignLanguageSkills = new MatTableDataSource<Element>(this.foreignLanguageSkills);
        if(this.foreignLanguageSkills.length == 0 && this.localLanguageSkills.length == 0 
          && this.signLanguage == false && this.selectedLevelSignLanguageDesc == "" 
          && this.brailleSystem == false && this.selectedLevelBrailleSysDesc == "") {
            this.disabledConsentSkillsAgreed = true;
        }
        else {
          this.disabledConsentSkillsAgreed = false;
        }
        break;
      
      case 'localLanguage': 
        for (var i = 0; i < this.localLanguageSkills.length; i++) {
          var idx = this.localLanguageSkills.indexOf(this.localLanguageSkills[i]);

          if(idx === index) {
            this.localLanguageSkills.splice(index, 1)
          }
        }
        
        this.dataSourceLocalLanguageSkills = new MatTableDataSource<Element>(this.localLanguageSkills);
        
        if(this.localLanguageSkills.length == 0 && this.foreignLanguageSkills.length == 0 
          && this.signLanguage == false && this.selectedLevelSignLanguageDesc == "" 
          && this.brailleSystem == false && this.selectedLevelBrailleSysDesc == "") {
            this.disabledConsentSkillsAgreed = true;
        }
        else {
          this.disabledConsentSkillsAgreed = false;
        }

        break;
      
      case 'outsideInterest': 
        for (var i = 0; i < this.declaredOutsideInterest.length; i++) {
          var idx = this.declaredOutsideInterest.indexOf(this.declaredOutsideInterest[i]);
          if(idx === index) {
            this.declaredOutsideInterest.splice(index, 1)
          }
        }
        this.dataSourceDeclaredOutsideInterest = new MatTableDataSource<Element>(this.declaredOutsideInterest);
        break;
        
      default:
        break;
    }

    if(this.foreignLanguageSkills.length === 0 && this.localLanguageSkills.length === 0 
      && !this.signLanguage || this.selectedLevelSignLanguageDesc == "" 
      && !this.brailleSystem || this.selectedLevelBrailleSysDesc == "" ) {
      this.disabledConsentSkillsAgreed = true;
      this.skillsAgreed = false;
    } else {
      this.disabledConsentSkillsAgreed = false;
    }
  }

  btnAddClick(type: string) {

    switch(type) {
      case 'parents':
        if(this.parents.length < 2) {

          this.openDialogSelectParent();
    
        } else {
          this.loginComponent.openDialog('Ooops! maximum count reach for "Parents"');
        }
        break;

      case 'siblings':
        if(this.siblings.length < 10) {

          this.addNewEntry('Sibling ', this.siblings.length + 1);
    
        } else {
          this.loginComponent.openDialog('Ooops! maximum count reach for "Sibling"');
        }
        break;

      case 'spouse':
        if(this.spouse.length < 1) {
          this.addNewEntry('Spouse', "");
        }
        else {
          this.loginComponent.openDialog('Ooops! No more than 1 spouse, OK?');
        }
        break;

      case 'child':
        if(this.child.length < 10) {
          this.addNewEntry('Child ', this.child.length + 1);
    
        } else {
          this.loginComponent.openDialog('Ooops! maximum count reach for "Sibling"');
        }
        break;
      
      case 'education':
        this.openDialogSelectEducation();
  
        break;
      case 'foreignLanguage':
        this.openDialogAddLanguage(this.foreignLanguageSkills, 'foreign');
        break;
      
      case 'localLanguage':
        this.openDialogAddLanguage(this.localLanguageSkills, 'local');
        break;

      case 'declaredOutsideInterest':
        // this.openDialogAddLanguage(this.localLanguageSkills, 'local');
        
        this.addNewEntry('declaredOutsideInterest', this.declaredOutsideInterest);
        break;

      default:
      break;
    }
  }


  addNewEntry(type, length) {

    var newEntryFamily = { 
      "BirthDate": "",
      "EmployeeID": this.EmployeeID,
      "FirstName": "",
      "ID": "",
      "LastName": "",
      "Membership": type + length,
      "MembershipID": length,
      "MiddleName": "",
      "Status": true
    }

    var newEntryDeclaredOutsideInterest = {
      "DateJoined": "",
      "Declared": true,
      "DeclaredDate": moment().format('L'),
      "EmployeeID": this.EmployeeID,
      "EntityName": "",
      "ModifiedDate": null,
      "Name": "",
      "NatureOfBusiness": "",
      "Position": ""
    }

    switch(type) {
      case 'Sibling ':
        this.siblings = [...this.siblings, newEntryFamily];
        this.dataSourceSiblings = new MatTableDataSource<Element>(this.siblings);
        break;

      case 'Spouse':
        this.spouse = [...this.spouse, newEntryFamily];
        this.dataSourceSpouse = new MatTableDataSource<Element>(this.spouse);
        break;

      case 'Child ':
        this.child = [...this.child, newEntryFamily];
        this.dataSourceChild = new MatTableDataSource<Element>(this.child);
        break;
      
      case 'declaredOutsideInterest':
        this.declaredOutsideInterest = [...this.declaredOutsideInterest, newEntryDeclaredOutsideInterest];
        console.log(this.declaredOutsideInterest);
        this.dataSourceDeclaredOutsideInterest = new MatTableDataSource<Element>(this.declaredOutsideInterest);
        break;
      
      default:
        break;
    }
  }

  getForeignLanguageSkills(id) {

    return this.detailsService.getForeignLanguageSkills(id).subscribe(data => {

      if(data) {
        this.displayedColumnsLanguage = ['LanguageDialect', 'Knowledge', 'WithFormalEducation', 'WithCertificate', 'LanguageSkillLevel', 'WillingIfNeeded', 'Delete'];
        this.foreignLanguageSkills = data
        this.dataSourceForeignLanguageSkills = new MatTableDataSource<Element>(data);
      }
      
    });
  }

  getLocalLanguageSkills(id) {

    return this.detailsService.getLocalLanguageSkills(id).subscribe(data => {
      
      if(data) {
        this.displayedColumnsLanguage = ['LanguageDialect', 'Knowledge',  'WithFormalEducation', 'WithCertificate', 'LanguageSkillLevel', 'WillingIfNeeded', 'Delete'];
        this.localLanguageSkills = data
        this.dataSourceLocalLanguageSkills = new MatTableDataSource<Element>(data);
      }

    });
  }

  getForeignLanguages() {
    return this.detailsService.getForeignLanguage().subscribe(data => {
      this.foreignLanguage = data;
    })
  }

  getLocalLanguages() {
    return this.detailsService.getLocalLanguage().subscribe(data => {
      this.localLanguage = data;
    })
  }

  getOtherSkills(id: any) {

    // EmployeeID: "002533"
    // Permission: true
    // SkillsType: 1
    // TypeDesc: "Sign Language       "
    // index: 1
   

    return this.detailsService.getOtherSkills(id).subscribe(data => {
      this.otherSkills = data;
      this.signLanguage = false
      this.brailleSystem = false

      this.signLanguageLevel1 = false;
      this.signLanguageLevel2 = false;
      this.signLanguageLevel3 = false;

      this.brailleLevel1 = false;
      this.brailleLevel2 = false;
      this.brailleLevel3 = false;
      
      this.selectedLevelSignLanguageDesc = "";
      this.selectedLevelBrailleSysDesc = "";

      if(data) {
        for (var i = 0; i < data.length; i++) {
        
          if (data[i].SkillsType === 1) {
            this.signLanguage = true;
            if(data[i].SkillsLevel === 'Basic') {
              this.signLanguageLevel1 = true;
              this.selectedLevelSignLanguageDesc = 'Basic'
            }
            else if (data[i].SkillsLevel === 'Intermediate') {
              this.signLanguageLevel2 = true;
              this.selectedLevelSignLanguageDesc = 'Intermediate'
            }
            else if (data[i].SkillsLevel === 'Advanced') {
              this.signLanguageLevel3 = true;
              this.selectedLevelSignLanguageDesc = 'Advanced'
            }
          } 
          
          if (data[i].SkillsType === 2) {
            this.brailleSystem = true;
            if(data[i].SkillsLevel === 'Basic') {
              this.brailleLevel1 = true;
              this.selectedLevelBrailleSysDesc = 'Basic'
            }
            else if (data[i].SkillsLevel === 'Intermediate') {
              this.brailleLevel2 = true;
              this.selectedLevelBrailleSysDesc = 'Intermediate'
            }
            else if (data[i].SkillsLevel === 'Advanced') {
              this.brailleLevel3 = true;
              this.selectedLevelBrailleSysDesc = 'Advanced'
            }
          } 
        }
  
        // this.thirdFormGroup.patchValue({
        //   frmCtrlSignLanguage: this.signLanguage,
        //   frmCtrlBrailleSystem: this.brailleSystem
        // });
      }
    });
  }

  getPRCTypes() {
    return this.detailsService.getPRCTypes().subscribe(data => {
      if(data) {

        for(let i = 0; i < data.length; i++) {
          if(data[i].ID === this.strPRCType1) {
            this.targetPRCtype1 = data[i].PRCType;
          }
        }


        for(let i = 0; i < data.length; i++) {
          if(data[i].ID === this.strPRCType2) {
            this.targetPRCtype2 = data[i].PRCType;
          }
        }

        this.prcTypes = data;

        this.thirdFormGroup.patchValue({
          frmCtrlPRCtype1: this.strPRCType1,
          frmCtrlPRCtype2: this.strPRCType2
        });
      }
    });
  }

  getDeclaredOutsideInterest(id: any) {
    return this.detailsService.getDeclaredOutsideInterest(id).subscribe(data => {
      if(data) {
        if(data.length > 0) {
          this.hideDeclaredOutsideInterest = false;
          this.selectedOutsideInterest = [
            {"name": "Yes", "value": 1, "checked": true},
            {"name": "No", "value": 2, "checked": false}
          ]
        
          this.displayedColumnsDeclaredOutsideInterest = ['EntityName', 'NatureOfBusiness', 'Position', 'DateJoined', 'Delete'];
          this.declaredOutsideInterest = data;
  
          this.dataSourceDeclaredOutsideInterest = new MatTableDataSource<Element>(data);
  
          this.fourthFormGroup.patchValue({
            frmCtrlOutsideInterest:  this.selectedOutsideInterest,
          });
        }
        else {
          this.hideDeclaredOutsideInterest = true;
          this.selectedOutsideInterest = [
            {"name": "Yes", "value": 1, "checked": false},
            {"name": "No", "value": 2, "checked": false}
          ]

          this.displayedColumnsDeclaredOutsideInterest = ['EntityName', 'NatureOfBusiness', 'Position', 'DateJoined', 'Delete'];

          this.declaredOutsideInterest = [];
  
          this.dataSourceDeclaredOutsideInterest = new MatTableDataSource<Element>(this.declaredOutsideInterest);
  
          this.fourthFormGroup.patchValue({
            frmCtrlOutsideInterest:  this.selectedOutsideInterest,
          });
        }
      }
    });
  }


  selectedOutsideInterestRadioChange(event: any) {
    if(event.value === 1) {
      this.hideDeclaredOutsideInterest = false;
      for(let i = 0; i < this.declaredOutsideInterest.length; i++){
        this.declaredOutsideInterest[i].Declared = true;
      }
    }
    else {
      this.hideDeclaredOutsideInterest = true;
      for(let i = 0; i < this.declaredOutsideInterest.length; i++){
        this.declaredOutsideInterest[i].Declared = false;
      }
    }
  }

  selectedSkillsRadioChange(type: any, event: any) {
    
    
    switch(type) {
      case 'signLanguage':
        this.selectedLevelSignLanguageDesc = event.value || "";
        this.disabledConsentSkillsAgreed = false;
        break;
      case 'brailleSystem':
        this.selectedLevelBrailleSysDesc = event.value || "";
        this.disabledConsentSkillsAgreed = false;
        break;
      default:
        break;
    }
  }

  changeSkillsValue(type: any, event: any) {
    switch(type) {
      case 'signLanguage':
        this.signLanguage = event.checked
        this.disabledSignLanguage = !event.checked;
        if(!event.checked) {
          this.selectedLevelSignLanguageDesc = "";
          if(!this.brailleSystem.checked && this.foreignLanguageSkills.length == 0 && this.localLanguageSkills == 0) {
            this.disabledConsentSkillsAgreed = true;
          }
          else {
            this.disabledConsentSkillsAgreed = false;
          }
        }
        break;
      case 'brailleSystem':
        this.brailleSystem = event.checked
        this.disabledBraille = !event.checked;
        if(!event.checked) {
          this.selectedLevelBrailleSysDesc = "";
          if(!this.brailleSystem.checked && this.foreignLanguageSkills.length == 0 && this.localLanguageSkills == 0) {
            this.disabledConsentSkillsAgreed = true;
          }
          else {
            this.disabledConsentSkillsAgreed = false;
          }
        }
        break;
      case 'skillsAgreed':
        this.skillsAgreed = event.checked
        break;
      default:
        break;
    }
  }

  updateDeclarationInterest(type: any, i: any, event: any){
    switch(type) {
      case 'nameOfEntity':
        this.declaredOutsideInterest[i].EntityName = event.target.value
        break;
      case 'natureOfEntity':
        this.declaredOutsideInterest[i].NatureOfBusiness = event.target.value
        break;
      case 'position':
        this.declaredOutsideInterest[i].Position = event.target.value
        break;
      case 'dateJoined':
        this.declaredOutsideInterest[i].DateJoined = event.target.value
        break;
      default:
        break;
    }
  }

  finish() {

    if(this.agreed) {
      try {
        let now = new Date;

        //START******** CONTACT INFORMATION **************/
        this.detailsService.updateEmployeeDataDetails(
        this.EmployeeID,
        moment(now).format('L HH:mm:ss'),
        this.mobile1,
        this.mobile2,
        this.landline,
        this.email,
        this.selectedBloodType,
        this.selectedCivilStatus,
        this.add11,
        this.add21,
        this.add12,
        this.add22,
        this.add13,
        this.add23,
        this.selectedPostalCity1,
        this.selectedPostalCity2,
        this.selectedStructureType1,
        this.selectedStructureType2,
        this.selectedOwnershipType1,
        this.selectedOwnershipType2,
        this.contactFullname,
        this.contactMobile,
        this.contactLandline,
        this.selectedContactRelationship
      ).subscribe(data => {
        if(data) {
          console.log(true);
        }
      });
      //END******** CONTACT INFORMATION **************/


      //START******** UPDATE FAMILY MEMBERS DATA **************/
      this.detailsService.deleteFamilyMembersData(this.EmployeeID).subscribe((data) => {
        let membership = 0;

        if(data) {
          //**************PARENTS
          for(var i = 0; i < this.parents.length; i++) {
            
            if(this.parents[i].Membership === "Father") {
              membership = 1
            }
            else {
              membership = 2
            }

            this.updateFamilyMembersData(
              this.EmployeeID, 
              membership,
              this.parents[i].LastName,
              this.parents[i].FirstName,
              this.parents[i].MiddleName,
              moment(this.parents[i].BirthDate).format('L')
            );
          }

          //**************SIBLINGS
          for(var i = 0; i < this.siblings.length; i++) {
            this.updateFamilyMembersData(
              this.EmployeeID, 
              i + 3,
              this.siblings[i].LastName,
              this.siblings[i].FirstName,
              this.siblings[i].MiddleName,
              moment(this.siblings[i].BirthDate).format('L')
            );
          }

           //**************SPOUSE
           for(var i = 0; i < this.spouse.length; i++) {
            this.updateFamilyMembersData(
              this.EmployeeID, 
              13,
              this.spouse[i].LastName,
              this.spouse[i].FirstName,
              this.spouse[i].MiddleName,
              moment(this.spouse[i].BirthDate).format('L')
            );
          }

          //**************CHILD
          for(var i = 0; i < this.child.length; i++) {
            this.updateFamilyMembersData(
              this.EmployeeID, 
              i + 14,
              this.child[i].LastName,
              this.child[i].FirstName,
              this.child[i].MiddleName,
              moment(this.child[i].BirthDate).format('L')
            );
          }
          
        }
      })
      //END******** UPDATE FAMILY MEMBERS DATA **************/
      
      //START******** UPDATE EDUCATION DETAILS **************/
    
      this.detailsService.deleteEmployeeEducationData(this.EmployeeID).subscribe((data) => {
        if(data) {
          for(var i = 0; i < this.educationDetails.length; i++) {
            this.updateEmployeeEducationData(
              this.EmployeeID, 
              moment(now).format('L HH:mm:ss'),
              this.EmployeeID,
              moment(now).format('L HH:mm:ss'),
              this.EmployeeID,
              this.educationDetails[i].LeveID,
              this.educationDetails[i].StatusID,
              moment(this.educationDetails[i].YearStarted).format('L'),
              moment(this.educationDetails[i].YearEnded).format('L'),
              this.educationDetails[i].ProgramDegree,
              this.educationDetails[i].SchoolName,
              this.educationDetails[i].SchoolAddress
            );
          }
        }
      });
      
      //END******** UPDATE EDUCATION DETAILS **************/

      //START******** UPDATE PRC LICENSES TYPE **************/

      

      // this.detailsService.updatePRCLicenses(
      //   this.EmployeeID,
      //   this.strPRCType1,
      //   this.strPRCType2,
      //   this.strPRCNo1 || "",
      //   this.strPRCNo2 || "",
      //   moment(this.strPRCExpiryDate1 || moment().format('L')).format('L'),
      //   moment(this.strPRCExpiryDate2 || moment().format('L')).format('L')
      // ).subscribe(data => {
      //   if(data) {
      //     console.log('data');
      //   }
      // })

      //************PRC 1************
      if(this.strPRCNo1 !== "" && this.strPRCExpiryDate1 !== "") {
        
        let date1 = moment(this.strPRCExpiryDate1).format('L')

        this.detailsService.updatePRCLicenses1(
          this.EmployeeID,
          this.strPRCType1,
          this.strPRCNo1,
          date1
        ).subscribe(data => {
          if(data) {
            console.log('data');
          }
        })
      }else {
        this.detailsService.deletePRCLicenses1(this.EmployeeID).subscribe(data => {
          console.log(data);
        })
      }
      

      //************PRC 2************
      if(this.strPRCNo2 !== "" && this.strPRCExpiryDate2 !== "") {
        
        let date2 = moment(this.strPRCExpiryDate2).format('L')
        
        this.detailsService.updatePRCLicenses2(
          this.EmployeeID,
          this.strPRCType2,
          this.strPRCNo2,
          date2
        ).subscribe(data => {
          if(data) {
            console.log(data);
          }
        })
      } 
      else {
        this.detailsService.deletePRCLicenses2(this.EmployeeID).subscribe(data => {
          console.log(data);
        })
      }
      
      //END******** UPDATE PRC LICENSES TYPE **************/
 


       //START******** UPDATE LANGUAGE **************/
      this.detailsService.deleteLanguageDetails(this.EmployeeID).subscribe(data => {
        if(data) {
          console.log(this.foreignLanguageSkills);
          if(this.foreignLanguageSkills.length > 0) {
            for(var i = 0; i < this.foreignLanguageSkills.length; i++) {
              this.detailsService.updateLanguageDetails(
                this.EmployeeID,
                this.foreignLanguageSkills[i].LanguageCode,
                this.foreignLanguageSkills[i].LanguageLevel,
                this.foreignLanguageSkills[i].LanguageType,
                this.foreignLanguageSkills[i].WithFormalEducation,
                this.foreignLanguageSkills[i].WithCertificate,
                this.foreignLanguageSkills[i].WillingIfNeeded,
                this.foreignLanguageSkills[i].LanguageSkillLevel,
                this.skillsAgreed
              ).subscribe(data => {
                console.log(data);
              })
            }
          }
          console.log(this.localLanguageSkills);
          if(this.localLanguageSkills.length > 0) {
            for(var i = 0; i < this.localLanguageSkills.length; i++) {
              this.detailsService.updateLanguageDetails(
                this.EmployeeID,
                this.localLanguageSkills[i].LanguageCode,
                this.localLanguageSkills[i].LanguageLevel,
                this.localLanguageSkills[i].LanguageType,
                this.localLanguageSkills[i].WithFormalEducation,
                this.localLanguageSkills[i].WithCertificate,
                this.localLanguageSkills[i].WillingIfNeeded,
                this.localLanguageSkills[i].LanguageSkillLevel,
                this.skillsAgreed
              ).subscribe(data => {
                console.log(data);
              })
            }
          }
        }
      })
       //END******** UPDATE LANGUAGE **************/

      //START******** UPDATE SKILLS **************/
      this.detailsService.deleteOtherSkillsDetails(this.EmployeeID).subscribe(data => {
        if(data) {
          if(this.signLanguage) {
            this.detailsService.updateOtherSkillsDetails(
              this.EmployeeID, 1, this.selectedLevelSignLanguageDesc, this.skillsAgreed
            ).subscribe(data => {
              console.log(data);
            })
          }

          if(this.brailleSystem) {
            this.detailsService.updateOtherSkillsDetails(
              this.EmployeeID, 2, this.selectedLevelBrailleSysDesc, this.skillsAgreed
            ).subscribe(data => {
              console.log(data);
            })
          }
        }
      })
      //END******** UPDATE SKILLS **************/

      //START******** UPDATE DECLARED OUTSIDE INTEREST **************/

      this.detailsService.deleteDelcaredOutsideInterest(this.EmployeeID).subscribe(data => {
        if(data) {
          if(!this.hideDeclaredOutsideInterest) {
            if(this.declaredOutsideInterest.length > 0) {
              for(var i = 0; i < this.declaredOutsideInterest.length; i++) {
                this.detailsService.updateDeclaredOutsideInterest(
                  this.EmployeeID,
                  this.declaredOutsideInterest[i].Name,
                  this.declaredOutsideInterest[i].EntityName,
                  this.declaredOutsideInterest[i].NatureOfBusiness,
                  this.declaredOutsideInterest[i].Position,
                  this.declaredOutsideInterest[i].DateJoined,
                  this.declaredOutsideInterest[i].Declared,
                  this.declaredOutsideInterest[i].DeclaredDate,
                  moment().format('L')
                ).subscribe(data => {
                  console.log(data);
                })
              }
            }
          }
        }
      })
      this.loginComponent.openDialog('Data has been saved')

      this.router.navigate(['finishPage']);
     
      
      //END******** UPDATE DECLARED OUTSIDE INTEREST **************/
      } catch (error) {
         this.loginComponent.openDialog(error);
      }
    }
  }

  updateFamilyMembersData(
    id: number, 
    membershipID: number, 
    lastName: string, 
    firstName: string,
    middleName: string,
    birthDate: any
  ) {
    this.detailsService.updateFamilyMembersData(id, membershipID, lastName, firstName, middleName, birthDate).subscribe(data => {
      console.log(data);
    })
  }

  updateEmployeeEducationData(
    id: number, 
    createdBy: string,
    createdDate: any,
    modified: string,
    modifiedBy: any,
    levelID: number,
    statusID: number,
    yearStarted: any,
    yearEnded: any,
    programDegree: string,
    schoolName: string,
    schoolAddress: string
  ) {
    this.detailsService.updateEmployeeEducationData( 
      id, 
      createdBy, 
      createdDate, 
      modified, 
      modifiedBy,
      levelID, 
      statusID, 
      yearStarted, 
      yearEnded,
      programDegree,
      schoolName,
      schoolAddress).subscribe(data => {
      console.log(data);
    })
  }
 
}

