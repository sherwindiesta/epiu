import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

  export class DetailsService {
  constructor(private http: Http) { }

  getDetails(id: number, tin: number, db: string) {
    const url = 'http://localhost:3000/getDetails?tin=' + tin + '&birthdate=' + db + '&id=' + id;
    
   return this.http.get(url).pipe(
      map((res) => res.json())
    );
  }

}