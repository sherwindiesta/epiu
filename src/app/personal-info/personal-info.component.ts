import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { ActivatedRoute } from "@angular/router";
//import { ChangeDetectorRef } from '@angular/core/testing';

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

  public firstName: string;
  public lastName: string;
  public middleName: string;

  constructor( private _formBuilder: FormBuilder, 
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private route: ActivatedRoute ) 
    {
      this.route.queryParams.subscribe(params => {
        this.firstName = params['firstName'];
        this.lastName = params['lastName'];
        this.middleName = params['middleName'];
      });
    }

  ngOnInit() {

    this.show = false;

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
  }
}
