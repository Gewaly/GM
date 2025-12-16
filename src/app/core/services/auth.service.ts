import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/envirinment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}`;
  http = inject(HttpClient);


  constructor() { }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`)
  }
  getSingleUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${id}`);
  }


}
