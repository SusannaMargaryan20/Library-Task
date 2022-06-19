import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {ManageAuthorReqModel} from "./req/manage-author-req-model";
import {environment} from "../../../../environments/environment";
import {AuthorResModel} from "./res/author-res-model";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  apiUrl: string =  environment.baseUrl + 'author';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create
  create(data: ManageAuthorReqModel): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL, data)
      .pipe(catchError(this.handleError))
  }

  // Read
  getList() {
    return this.http.get<AuthorResModel[]>(`${this.apiUrl}`);
  }

  // Update
  update(id: number, data: ManageAuthorReqModel): Observable<any> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.handleError))
  }

  // Delete
  delete(id: number): Observable<any> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.http.delete(API_URL)
      .pipe(catchError(this.handleError))
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

}
