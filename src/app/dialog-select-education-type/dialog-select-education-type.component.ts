import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { DetailsService } from '../details.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-select-education-type',
  templateUrl: './dialog-select-education-type.component.html',
  styleUrls: ['./dialog-select-education-type.component.css']
})
export class DialogSelectEducationTypeComponent implements OnInit {
  
  
  id; levelOfEducation; status; level; statusOfEducation: string;
  data; educationLevel; educationStatus: any[] = [];
  CurrentDate = moment().format();

  constructor( public dialogRef: MatDialogRef<DialogSelectEducationTypeComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData,
    private router: Router,
    private detailsService: DetailsService
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
  };

  btnOKClick() {
  
    this.AddNewEducationEntry(this.id, this.statusOfEducation, this.levelOfEducation);
  }


  AddNewEducationEntry(EmployeeID: any, statusOfEducation: string, levelOfEducation: string) {
    

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
      "Modified": "",
      "ModifiedBy": "",
      "ProgramDegree": "",
      "SchoolAddress": "",
      "SchoolName": "",
      "Status": 1,
      "StatusID": this.status,
      "YearEnded": "",
      "YearStarted": ""
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
}
