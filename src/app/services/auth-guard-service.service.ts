import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService implements CanActivate {

  constructor(private router : Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const data = localStorage.getItem("username");
    if (!data) {
      Swal.fire({
        title: 'Please Do Login to View Details',
        icon: 'warning',
        confirmButtonColor: '#000000',
        confirmButtonText: 'Yes',
      })
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }

  }
}
