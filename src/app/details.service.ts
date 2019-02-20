import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})

  export class DetailsService {
  constructor(private http: Http, private config: ConfigService) { }

  getDetails(id: number, db: string) {

    const url = 'http://'+ this.config.ipPort +'/getDetails?birthdate=' + db + '&id=' + id;
    return this.returnData(url);
  }

  getGenderList() {
    const url = 'http://'+ this.config.ipPort +'/getGenderList';
    return this.returnData(url);
  }

  getPhilippinePostalCodes(area: string) {
    const url = 'http://'+ this.config.ipPort +'/getPhilippinePostalCodes?area=' + area;
    return this.returnData(url);
  }

  getDistinctPhilippinePostalCodes() {
    const url = 'http://'+ this.config.ipPort +'/getDistinctPhilippinePostalCodes';
    return this.returnData(url);
  }

  getSpecificPhilippinePostalCodes(postalID: number) {
    const url = 'http://'+ this.config.ipPort +'/getSpecificPhilippinePostalCodes?ID=' + postalID;
    return this.returnData(url);
  }

  getCivilStatusList(id: number) {
    const url = 'http://'+ this.config.ipPort +'/getCivilStatusList?ID=' + id;
    return this.returnData(url);
  }

  getEmployeeData(id: number) {
    const url = 'http://'+ this.config.ipPort +'/getEmployeeData?id=' + id;
    return this.returnData(url);
  }

  getStructureType() {
    const url = 'http://'+ this.config.ipPort +'/getStructureType';
    return this.returnData(url);
  }

  getOwnershipType() {
    const url = 'http://'+ this.config.ipPort +'/getOwnershipType';
    return this.returnData(url);
  }

  getBloodType() {
    const url = 'http://'+ this.config.ipPort +'/getBloodType';
    return this.returnData(url);
  }

  getContactRelationship() {
    const url = 'http://'+ this.config.ipPort +'/getContactRelationship';
    return this.returnData(url);
  }

  getFamilyMembersData(id: number) {
    const url = 'http://'+ this.config.ipPort +'/getFamilyMembersData?id=' + id;
    return this.returnData(url);
  }

  getFamilyMembersDataParents(id: number) {
    const url = 'http://'+ this.config.ipPort +'/getFamilyMembersDataParents?id=' + id;
    return this.returnData(url);
  }

  getFamilyMembersDataSiblings(id: number) {
    const url = 'http://'+ this.config.ipPort +'/getFamilyMembersDataSiblings?id=' + id;
    return this.returnData(url);
  }

  getFamilyMembersDataSpouse(id: number) {
    const url = 'http://'+ this.config.ipPort +'/getFamilyMembersDataSpouse?id=' + id;
    return this.returnData(url);
  }

  getFamilyMembersDataChild(id: number) {
    const url = 'http://'+ this.config.ipPort +'/getFamilyMembersDataChild?id=' + id;
    return this.returnData(url);
  }

  getFamilyMembersDataParentsTypes() {
    const url = 'http://'+ this.config.ipPort +'/getFamilyMembersDataParentsTypes';
    return this.returnData(url);
  }

  getEducationDetails(id: number) {
    const url = 'http://'+ this.config.ipPort +'/getEducationDetails?id=' + id;
    return this.returnData(url);
  }

  getEducationLevels() {
    const url = 'http://'+ this.config.ipPort +'/getEducationLevels';
    return this.returnData(url);
  }

  getEducationStatus() {
    const url = 'http://'+ this.config.ipPort +'/getEducationStatus';
    return this.returnData(url);
  }

  getPRCTypes() {
    const url = 'http://'+ this.config.ipPort +'/getPRCTypes';
    return this.returnData(url);
  }

  getForeignLanguageSkills(id: number) {
    const url = 'http://'+ this.config.ipPort +'/getForeignLanguageSkills?id=' + id;
    return this.returnData(url);
  }

  getLocalLanguageSkills(id: number) {
    const url = 'http://'+ this.config.ipPort +'/getLocalLanguageSkills?id=' + id;
    return this.returnData(url);
  }

  getOtherSkills(id: number) {
    const url = 'http://'+ this.config.ipPort +'/getOtherSkills?id=' + id;
    return this.returnData(url);
  }

  getForeignLanguage() {
    const url = 'http://'+ this.config.ipPort +'/getForeignLanguage';
    return this.returnData(url);
  }

  getLocalLanguage() {
    const url = 'http://'+ this.config.ipPort +'/getLocalLanguage';
    return this.returnData(url);
  }

  getLanguageLevels() {
    const url = 'http://'+ this.config.ipPort +'/getLanguageLevels';
    return this.returnData(url);
  }

  getDeclaredOutsideInterest(id: number) {
    const url = 'http://'+ this.config.ipPort +'/getDeclaredOutsideInterest?id=' + id;
    return this.returnData(url);
  }

  getListOfSchoolNames(schoolName: string) {
    const url = 'http://'+ this.config.ipPort +'/getSchoolNames?schoolName=' + schoolName;
    return this.returnData(url);
  }

  getPermission(id: number) {
    const url = 'http://'+ this.config.ipPort +'/getPermission?id=' + id;
    return this.returnData(url);
  }

  getDivisionDepartmentList() {
    const url = 'http://'+ this.config.ipPort +'/getDivisionDepartmentList';
    return this.returnData(url);
  }

  updateEmployeeDataDetails(
    id: number,
    modifiedDate: any,
    mobile1: string,
    mobile2: string,
    landline: string,
    email: string,
    selectedBloodType: number,
    selectedCivilStatus: number,
    add11: string,
    add21: string,
    add12: string,
    add22: string,
    add13: string,
    add23: string,
    selectedPostalCity1: number,
    selectedPostalCity2: number,
    selectedStructureType1: number,
    selectedStructureType2: number,
    selectedOwnershipType1: number,
    selectedOwnershipType2: number,
    contactFullname: string,
    contactMobile: string,
    contactLandline: string,
    selectedContactRelationship: number
  ) {
    const url = 'http://'+ this.config.ipPort +'/updateEmployeeDataDetails?employeeID=' + id + 
      '&modifiedDate=' + modifiedDate + 
      '&mobile1=' + mobile1 +
      '&mobile2=' + mobile2 +
      '&landline=' + landline +
      '&email=' + email +
      '&selectedBloodType=' + selectedBloodType +
      '&selectedCivilStatus=' + selectedCivilStatus +
      '&add11=' + add11 +
      '&add21=' + add21 +
      '&add12=' + add12 +
      '&add22=' + add22 +
      '&add13=' + add13 +
      '&add23=' + add23 +
      '&selectedPostalCity1=' + selectedPostalCity1 +
      '&selectedPostalCity2=' + selectedPostalCity2 +
      '&selectedStructureType1=' + selectedStructureType1 +
      '&selectedStructureType2=' + selectedStructureType2 +
      '&selectedOwnershipType1=' + selectedOwnershipType1 +
      '&selectedOwnershipType2=' + selectedOwnershipType2 +
      '&contactFullname=' + contactFullname +
      '&contactMobile=' + contactMobile +
      '&contactLandline=' + contactLandline +
      '&selectedContactRelationship=' + selectedContactRelationship;

    return this.updateData(url);
  }


  

  deleteFamilyMembersData(id: number) {
    const url = 'http://'+ this.config.ipPort +'/deleteFamilyMembersData?id=' + id;
    return this.deleteData(url);
  }

  deleteEmployeeEducationData(id: number) {
    const url = 'http://'+ this.config.ipPort +'/deleteEmployeeEducationData?id=' + id;
    return this.deleteData(url);
  }

  deleteLanguageDetails(id: number) {
    const url = 'http://'+ this.config.ipPort +'/deleteLanguageDetails?id=' + id;
    return this.deleteData(url);
  }

  deleteOtherSkillsDetails(id: number) {
    const url = 'http://'+ this.config.ipPort +'/deleteOtherSkillsDetails?id=' + id;
    return this.deleteData(url);
  }

  deleteDelcaredOutsideInterest(id: number) {
    const url = 'http://'+ this.config.ipPort +'/deleteDelcaredOutsideInterest?id=' + id;
    return this.deleteData(url);
  }

  updateFamilyMembersData( 
    id: number, 
    membershipID: number, 
    lastName: string, 
    firstName: string,
    middleName: string,
    birthDate: any
   ) {
    const url = 'http://'+ this.config.ipPort +'/updateFamilyMembersData?id=' + id +
    '&membershipID=' + membershipID + 
    '&lastName=' + lastName +
    '&firstName=' + firstName +
    '&middleName=' + middleName +
    '&birthDate=' + birthDate;
    return this.createData(url);
  }

 
  insertNewHireMMCDataPrivacyConsent(
    fullname: string,
    divisionDepartment: string, 
    Agree: any,
    DateEntered: any,
    user: string
  ) {
    const url = 'http://'+ this.config.ipPort +'/insertNewHireMMCDataPrivacyConsent?fullname=' + fullname + 
    '&divisionDepartment=' + divisionDepartment +
    '&Agree=' + Agree +
    '&DateEntered=' + DateEntered +
    '&user=' + user;

    return this.createData(url);
  }

  insertEmployeeDataDetails(
    employeeID: number,
    modifiedDate: any,
    mobile1: string,
    mobile2: string,
    landline: string,
    email: string,
    selectedBloodType: number,
    selectedCivilStatus: number,
    add11: string,
    add21: string,
    add12: string,
    add22: string,
    add13: string,
    add23: string,
    selectedPostalCity1: number,
    selectedPostalCity2: number,
    selectedStructureType1: number,
    selectedStructureType2: number,
    selectedOwnershipType1: number,
    selectedOwnershipType2: number,
    contactFullname: string,
    contactMobile: string,
    contactLandline: string,
    selectedContactRelationship: number
  ) {
    const url = 'http://'+ this.config.ipPort +'/insertEmployeeDataDetails?employeeID=' + employeeID + 
    '&modifiedDate=' + modifiedDate + 
    '&mobile1=' + mobile1 +
    '&mobile2=' + mobile2 +
    '&landline=' + landline +
    '&email=' + email +
    '&selectedBloodType=' + selectedBloodType +
    '&selectedCivilStatus=' + selectedCivilStatus +
    '&add11=' + add11 +
    '&add21=' + add21 +
    '&add12=' + add12 +
    '&add22=' + add22 +
    '&add13=' + add13 +
    '&add23=' + add23 +
    '&selectedPostalCity1=' + selectedPostalCity1 +
    '&selectedPostalCity2=' + selectedPostalCity2 +
    '&selectedStructureType1=' + selectedStructureType1 +
    '&selectedStructureType2=' + selectedStructureType2 +
    '&selectedOwnershipType1=' + selectedOwnershipType1 +
    '&selectedOwnershipType2=' + selectedOwnershipType2 +
    '&contactFullname=' + contactFullname +
    '&contactMobile=' + contactMobile +
    '&contactLandline=' + contactLandline +
    '&selectedContactRelationship=' + selectedContactRelationship;

    return this.createData(url);

  }

  updateEmployeeEducationData( 
    id: number,
    createdDate: any, 
    createdBy: string,
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
    const url = 'http://'+ this.config.ipPort +'/updateEmployeeEducationData?id=' + id +
    '&createdBy=' + createdBy + 
    '&createdDate=' + createdDate +
    '&modified=' + modified +
    '&modifiedBy=' + modifiedBy +
    '&levelID=' + levelID +
    '&statusID=' + statusID +
    '&yearStarted=' + yearStarted +
    '&yearEnded=' + yearEnded +
    '&programDegree=' + programDegree +
    '&schoolName=' + schoolName +
    '&schoolAddress=' + schoolAddress;
    return this.createData(url);
    
  }

  // updatePRCLicenses(
  //   id: number,
  //   strPRCType1: string,
  //   strPRCType2: string,
  //   strPRCNo1: string,
  //   strPRCNo2: string,
  //   strPRCExpiryDate1: any,
  //   strPRCExpiryDate2: any
  // ) {
  //   const url = 'http://'+ this.config.ipPort +'/updatePRCLicenses?employeeID=' + id + 
  //   '&strPRCType1=' + strPRCType1 + 
  //   '&strPRCType2=' + strPRCType2 +
  //   '&strPRCNo1=' + strPRCNo1 +
  //   '&strPRCNo2=' + strPRCNo2 +
  //   '&strPRCExpiryDate1=' + strPRCExpiryDate1 +
  //   '&strPRCExpiryDate2=' + strPRCExpiryDate2;

  //   return this.updateData(url);
  // }

  updatePRCLicenses1(
    id: number,
    strPRCType1: number,
    strPRCNo1: number,
    strPRCExpiryDate1: any
  ) {
    const url = 'http://'+ this.config.ipPort +'/updatePRCLicenses1?employeeID=' + id + 
    '&strPRCType1=' + strPRCType1 + 
    '&strPRCNo1=' + strPRCNo1 +
    '&strPRCExpiryDate1=' + strPRCExpiryDate1;

    return this.updateData(url);
  }

  updatePRCLicenses2(
    id: number,
    strPRCType2: number,
    strPRCNo2: number,
    strPRCExpiryDate2: any
  ) {
    const url = 'http://'+ this.config.ipPort +'/updatePRCLicenses2?employeeID=' + id + 
    '&strPRCType2=' + strPRCType2 +
    '&strPRCNo2=' + strPRCNo2 +
    '&strPRCExpiryDate2=' + strPRCExpiryDate2;

    return this.updateData(url);
  }


  deletePRCLicenses1(id: number) {
    const url = 'http://'+ this.config.ipPort +'/deletePRCLicenses1?employeeID=' + id;
    return this.updateData(url);
  }


  deletePRCLicenses2(id: number) {
    const url = 'http://'+ this.config.ipPort +'/deletePRCLicenses2?employeeID=' + id;
    return this.updateData(url);
  }

  updateLanguageDetails(
    id: number,
    languageCode: number,
    languageLevel: number,
    languageType: number,
    withFormalEducation: string,
    withCertificate: string,
    willingIfNeeded: string,
    languageSkillLevel: string,
    permission: true
  ) {
    const url = 'http://'+ this.config.ipPort +'/updateLanguageDetails?employeeID=' + id + 
    '&languageCode=' + languageCode + 
    '&languageLevel=' + languageLevel +
    '&languageType=' + languageType +
    '&withFormalEducation=' + withFormalEducation +
    '&withCertificate=' + withCertificate +
    '&willingIfNeeded=' + willingIfNeeded +
    '&languageSkillLevel=' + languageSkillLevel +
    '&permission=' + permission;

    return this.createData(url);
  }


  updateOtherSkillsDetails(
    id: number,
    skillsType: number,
    skillsLevel: string,
    permission: string
  ) {
    const url = 'http://'+ this.config.ipPort +'/updateOtherSkillsDetails?employeeID=' + id + 
    '&skillsType=' + skillsType + 
    '&skillsLevel=' + skillsLevel +
    '&permission=' + permission;

    return this.createData(url);
  }

  updateDeclaredOutsideInterest(
    id: number,
    name: string,
    entityName: string,
    natureOfBusiness: string,
    position: string,
    dateJoined: any,
    declared: number,
    declaredDate: any,
    modifiedDate: any
  ) {
    const url = 'http://'+ this.config.ipPort +'/updateDeclaredOutsideInterest?employeeID=' + id + 
    '&name=' + name + 
    '&entityName=' + entityName +
    '&natureOfBusiness=' + natureOfBusiness +
    '&position=' + position +
    '&dateJoined=' + dateJoined +
    '&declared=' + declared +
    '&declaredDate=' + declaredDate +
    '&modifiedDate=' + modifiedDate;
    return this.createData(url);
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

  updateData(url: any) {
    return this.http.put(url, "")
    .pipe(
      map((res) => res.json()  
      ),
      catchError(error => 
        throwError(error)
      )
    );
  }

  createData(url: any) {
    return this.http.post(url, "")
    .pipe(
      map((res) => res.json()),
      catchError(error => 
        throwError(error)
      )
    );
  }

  deleteData(url: any) {
    return this.http.delete(url, "")
    .pipe(
      map((res) => res.json()),
      catchError(error => 
        throwError(error)
      )
    );
  }



 
  

}