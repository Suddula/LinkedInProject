import { Injectable } from '@angular/core';
import { LinkedinPost } from './models/linkedin';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadServicesService {

  baseURL = "https://localhost:44309/api/LinkedIns";
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  linkedInService: any;
  linkedIdData: any;

  constructor(private http: HttpClient,
    ) { }

  // Get Users


  // Create User
  // addUser(name: string, profileImage: File): Observable<any> {
  //   var formData: any = new FormData();
  //   formData.append("name", name);
  //   formData.append("avatar", profileImage);

  //   return this.http.post<LinkedinPost>(`${this.baseURL}`, formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   })
  // }
  addUser(data:LinkedinPost):Observable<Array<LinkedinPost>>{
    return this.http.post<Array<LinkedinPost>>(`${this.baseURL}`,data);
  }
  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
