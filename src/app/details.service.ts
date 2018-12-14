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

  getMaritalStatusList() {
    const url = 'http://localhost:3000/getMaritalStatusList';
    return this.returnData(url);
  }

  getEmployeeData(id: number) {
    const url = 'http://localhost:3000/getEmployeeData?id=' + id;
    return this.returnData(url);
  }

  returnData(url: any) {
    return this.http.get(url)
    .pipe(
      map((res) => res.json()),
      catchError(error => 
        throwError(new Error('Server Error, please contact HR Analytics immediately.').message)
      )
    );
  }

}