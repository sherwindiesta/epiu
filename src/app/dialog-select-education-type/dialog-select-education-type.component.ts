import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { DetailsService } from '../details.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-select-education-type',
  templateUrl: './dialog-select-education-type.component.html',
  styleUrls: ['./dialog-select-education-type.component.css']
})
export class DialogSelectEducationTypeComponent implements OnInit {
  
  
  id; levelOfEducation; status; level; 
  statusOfEducation; schoolName; programDegree; schoolAddress: string;
  data; educationLevel; educationStatus; optionsSchools: any[] = [];
  CurrentDate = moment().format();
  yearStarted; yearEnded: any;
  newEntryForm: FormGroup;

  constructor( public dialogRef: MatDialogRef<DialogSelectEducationTypeComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData,
    private router: Router,
    private detailsService: DetailsService,
    private formBuilder: FormBuilder
    ) { 
      this.data = dialogData.data;
      this.id = dialogData.id;
    }

  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  ngOnInit() {
    
    this.detailsService.getEducationLevels().subscribe(data => {
      if(data) {
        this.educationLevel = data;
      }
    });

    this.detailsService.getEducationStatus().subscribe(data => {
      this.educationStatus = data;
    });



    this.newEntryForm = this.formBuilder.group({
      EducationLevel: ['', Validators.required],
      EducationStatus: ['', Validators.required],
      frmCtrlSchoolName: ['', Validators.required],
      frmCtrlProgram: ['', Validators.required],
      frmCtrlSchoolAdress: ['', Validators.required],
      frmCtrlYearStarted: ['', Validators.required],
      frmCtrlYearEnded: ['', Validators.required]
    });
  };

  btnOKClick() {
  
    this.AddNewEducationEntry(this.id, 
      this.statusOfEducation, 
      this.levelOfEducation, 
      this.schoolName,
      this.programDegree,
      this.schoolAddress,
      this.yearStarted,
      this.yearEnded);
  }


  AddNewEducationEntry(EmployeeID: any, 
    statusOfEducation: string, 
    levelOfEducation: string,
    schoolName: string,
    programDegree: string,
    schoolAdress: string,
    yearStarted: any,
    yearEnded: any) {
    

    if(statusOfEducation === "Graduate") {
      this.status = 2
    }
    else if(statusOfEducation === "Undergraduate") {
      this.status = 1
    }
    else {
      this.status = "";
    }

    if(levelOfEducation === "Tertiary(College/University)") {
      this.level = 3
    }
    else if(statusOfEducation === "Masteral") {
      this.level = 4
    }
    else if(statusOfEducation === "Doctoral") {
      this.level = 5
    }
    else {
      this.level = "";
    }

    var newEntry = { 
      "Created": this.CurrentDate,
      "CreatedBy": EmployeeID,
      "EmployeeID": EmployeeID,
      "ID": "",
      "LeveID": this.level,
      "Level": statusOfEducation,
      "LevelOfEducation": levelOfEducation,
      "Modified": this.CurrentDate,
      "ModifiedBy": EmployeeID,
      "ProgramDegree": programDegree,
      "SchoolAddress": schoolAdress,
      "SchoolName": schoolName,
      "Status": 1,
      "StatusID": this.status,
      "YearEnded": yearEnded,
      "YearStarted": yearStarted
    }

    this.data = [...this.data, newEntry];

    this.onNoClick(this.data);
    
  }

  educationStatusChange(event: any) {
    this.statusOfEducation = event.value;
  }

  educationLevelChange(event: any) {
    this.levelOfEducation = event.value;
  }


  updateEducationSkills(type: any, event: any) {
   
    switch(type) {
      case 'schoolName':

        this.schoolName = event.target.value
        this.getListOfSchoolNames(this.schoolName);

        break;

      case 'programDegree': 
        this.programDegree = event.target.value
        break;
      
      case 'schoolAddress': 
        this.schoolAddress = event.target.value
        break;

      case 'yearStarted': 
        this.yearStarted = event.target.value
        break;

      case 'yearEnded': 
        this.yearEnded = event.target.value
        break;

      default:
        break;  
    }
  }

  getListOfSchoolNames(schoolName: string) {
    
    return this.detailsService.getListOfSchoolNames(schoolName).subscribe(data => {
      if(data) {
        this.optionsSchools = data;
      }
    })
  }

  optionSelectedSchool(i: any, name: any) {
    this.schoolName = name;
  }

}
