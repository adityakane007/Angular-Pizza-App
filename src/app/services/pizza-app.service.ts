import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PizzaAppService {

  subject = new Subject<any>();

  private apiURL = "http://127.0.0.1:8000/api/pizza-api";
  private menuDashboardURL = "http://127.0.0.1:8000/api/menu-dashboard";
  private orderCheckOut = "http://127.0.0.1:8000/api/order";

  constructor(private http: HttpClient, private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  addUser(data: User): Observable<any> {
    return this.http.post(this.apiURL, JSON.stringify(data), this.httpOptions);
  }

  getUserById(userId: any): Observable<any> {
    return this.http.get(this.apiURL + '/' + userId);
  }

  editUser(userId: any, data: any): Observable<any> {
    return this.http.put(this.apiURL + '/' + userId, JSON.stringify(data), this.httpOptions);
  }

  loginUser(data: User): Observable<any> {
    return this.http.post(this.apiURL + '/user-login', JSON.stringify(data), this.httpOptions);
  }

  isLoggedIn() {
    const data = localStorage.getItem("username");
    if (!data) {
      this.subject.next({ isLoggedIn: false })
      return false;
    } else {
      this.subject.next({ isLoggedIn: true })
      return true;
    }
  }

  getAllMenuItems() {
    return this.http.get(this.menuDashboardURL);
  }

  addToCartMenu(menuDtls: any) {
    this.subject.next(menuDtls);
  }

  getCartMenu(): Observable<any> {
    return this.subject.asObservable();
  }

  checkOut(amount: any, data: any, transactionDtls: any): Observable<any> {
    var postData = { 'param1': (data), 'param2': transactionDtls, 'param3': amount, 'param4': localStorage.getItem("username") };
    return this.http.post(this.orderCheckOut, JSON.stringify(postData), this.httpOptions);
  }

  isLoggedOut() {
    localStorage.removeItem("username");
    localStorage.removeItem("addToCart");
    localStorage.removeItem("menuTotal");
    this.subject.next({ isLoggedIn: false })
    this.router.navigate(['dashboard'])
  }

}
