import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

  export class DetailsService {
  constructor(private http: Http) { }

  getDetails(id: number, tin: number, db: string) {
    const url = 'http://localhost:3000/getDetails?tin=' + tin + '&birthdate=' + db + '&id=' + id;
    return this.returnData(url);
  }

  getGenderList() {
    const url = 'http://localhost:3000/getGenderList';
    return this.returnData(url);
  }

  getPhilippinePostalCodes(area: string) {
    const url = 'http://localhost:3000/getPhilippinePostalCodes?area=' + area;
    return this.returnData(url);
  }

  getDistinctPhilippinePostalCodes() {
    const url = 'http://localhost:3000/getDistinctPhilippinePostalCodes';
    return this.returnData(url);
  }

  getSpecificPhilippinePostalCodes(postalID: number) {
    const url = 'http://localhost:3000/getSpecificPhilippinePostalCodes?ID=' + postalID;
    return this.returnData(url);
  }

  getCivilStatusList(id: number) {
    const url = 'http://localhost:3000/getCivilStatusList?ID=' + id;
    return this.returnData(url);
  }

  getEmployeeData(id: number) {
    const url = 'http://localhost:3000/getEmployeeData?id=' + id;
    return this.returnData(url);
  }

  getStructureType() {
    const url = 'http://localhost:3000/getStructureType';
    return this.returnData(url);
  }

  getOwnershipType() {
    const url = 'http://localhost:3000/getOwnershipType';
    return this.returnData(url);
  }

  getBloodType() {
    const url = 'http://localhost:3000/getBloodType';
    return this.returnData(url);
  }

  getContactRelationship() {
    const url = 'http://localhost:3000/getContactRelationship';
    return this.returnData(url);
  }

  getFamilyMembersData(id: number) {
    const url = 'http://localhost:3000/getFamilyMembersData?id=' + id;
    return this.returnData(url);
  }

  getFamilyMembersDataParents(id: number) {
    const url = 'http://localhost:3000/getFamilyMembersDataParents?id=' + id;
    return this.returnData(url);
  }

  getFamilyMembersDataSiblings(id: number) {
    const url = 'http://localhost:3000/getFamilyMembersDataSiblings?id=' + id;
    return this.returnData(url);
  }

  getFamilyMembersDataSpouse(id: number) {
    const url = 'http://localhost:3000/getFamilyMembersDataSpouse?id=' + id;
    return this.returnData(url);
  }


  returnData(url: any) {
    return this.http.get(url)
    .pipe(
      map((res) => res.json()),
      catchError(error => 
        throwError(new Error('Server Error, please contact HR Analytics immediately.'))
      )
    );
  }

 
  

}