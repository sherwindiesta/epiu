import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { DetailsService } from '../details.service';
import * as moment from 'moment';


export interface formalEducation {
  value: string;
  viewValue: string;
}

export interface certification {
  value: string;
  viewValue: string;
}

export interface serve {
  value: string;
  viewValue: string;
}

export interface skillLevel {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-select-add-language',
  templateUrl: './dialog-select-add-language.component.html',
  styleUrls: ['./dialog-select-add-language.component.css']
})


export class DialogSelectAddLanguageComponent implements OnInit {

  id; selectedLanguageType; selectedLanguageLevel; 
  selectedLanguageTypeDesc; selectedLanguageLevelDesc;
  title; withEd; withCert; willingIfNeeded;
  languageSkillLevel: string;

  langType: number

  data; languageLevel; languageTypes: any[] = [];
  
  CurrentDate = moment().format();

  formalEducation: formalEducation[] = [
    {value: 'Yes', viewValue: 'Yes'},
    {value: 'No', viewValue: 'No'}
  ];

  certification: certification[] = [
    {value: 'Yes', viewValue: 'Yes'},
    {value: 'No', viewValue: 'No'}
  ];

  serve: serve[] = [
    {value: 'Yes', viewValue: 'Yes'},
    {value: 'No', viewValue: 'No'}
  ];

  skillLevel: skillLevel[] = [
    {value: 'Basic', viewValue: 'Basic'},
    {value: 'Intermediate', viewValue: 'Intermediate'},
    {value: 'Advanced', viewValue: 'Advanced'}
  ];

  constructor( public dialogRef: MatDialogRef<DialogSelectAddLanguageComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData,
    private router: Router,
    private detailsService: DetailsService) { 

      this.data = dialogData.data;
      this.id = dialogData.id;
      this.title = dialogData.title

      if(this.title === "foreign") {
        this.langType = 1
      }
      else {
        this.langType = 2
      }

  }

  ngOnInit() {
    this.detailsService.getLanguageLevels().subscribe(data => {
      if(data) {
        this.languageLevel = data;
      }
    });

    if(this.title === "foreign") {
      this.detailsService.getForeignLanguage().subscribe(data => {
        if(data) {
          this.languageTypes = data;
        }
      });
    }
    else if (this.title === "local") {
      this.detailsService.getLocalLanguage().subscribe(data => {
        if(data) {
          this.languageTypes = data;
        }
      });
    }
    
  }

  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  languageTypeChange(event: any) {
    this.selectedLanguageType = event.value[0];
    this.selectedLanguageTypeDesc = event.value[1];
    
  }

  languageLevelChange(event: any) {
    this.selectedLanguageLevel = event.value[0];
    this.selectedLanguageLevelDesc = event.value[1];
  }


  selectEducaton(event: any) {
    this.withEd = event.value;
  }

  selectCert(event: any) {
    this.withCert = event.value;
  }

  selectWilling(event: any) {
    this.willingIfNeeded = event.value;
  }

  selectLanguageSkillLevel(event: any) {
    this.languageSkillLevel = event.value;
  }


  btnOKClick() {
    
  this.AddNewForeignLanguage( this.id, 
      this.selectedLanguageType, 
      this.selectedLanguageTypeDesc, 
      this.selectedLanguageLevel,
      this.selectedLanguageLevelDesc,
      this.withEd,
      this.withCert,
      this.willingIfNeeded,
      this.languageSkillLevel
       );
  }

  AddNewForeignLanguage(id: string, 
    langType: any, 
    langTypeDesc: any, 
    langLevel: any, 
    langLevelDesc: any,
    withEd: any,
    withCert: any,
    willingIfNeeded,
    languageSkillLevel: any ) {
    //DELETE EXISTING LANGUAGE


    for (var i = 0; i < this.data.length; i++) {
      if(this.data[i].LanguageCode === langType) {
        this.data.splice(i, 1);
      }
    }

    var newEntry = { 
      "EmployeeID": id,
      "Knowledge": langLevelDesc,
      "LanguageCode": langType,
      "LanguageDialect": langTypeDesc,
      "LanguageLevel": langLevel,
      "LanguageType": this.langType,
      "WithFormalEducation": withEd,
      "WithCertificate": withCert,
      "WillingIfNeeded": willingIfNeeded,
      "LanguageSkillLevel": languageSkillLevel,
      "Permission": true,
      "TypeDesc": this.title
    }

    this.data = [...this.data, newEntry];

    this.onNoClick(this.data);
  }

}
