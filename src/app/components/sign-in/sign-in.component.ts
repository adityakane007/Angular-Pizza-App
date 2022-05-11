import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PizzaAppService } from 'src/app/services/pizza-app.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  responseData: any;
  responseDataResult: any;

  constructor(private pizzaAppService: PizzaAppService, private router: Router) { }

  ngOnInit(): void {
  }

  getUsernameMessage() {
    if (this.username.hasError('required')) {
      return 'Please Enter Username';
    }
    else {
      return true;
    }
  }

  getPasswordMessage() {
    if (this.password.hasError('required')) {
      return 'Please Enter Password';
    } else {
      return true;
    }
  }

  onSubmit() {
    if (this.username.value != '' && this.password.value != '') {
      var formData = {
        name: "null",
        email: "null",
        mobile: "null",
        address: "null",
        username: this.username.value,
        password: this.password.value
      }
      this.pizzaAppService.loginUser(formData).subscribe(res => {        
        this.responseData = res;        
        if (this.responseData.success == "1") {
          this.responseDataResult = true;
          localStorage.setItem('username', this.username.value);
          this.pizzaAppService.isLoggedIn();
          return this.router.navigate(['/menu-dashboard']);
        } else {
          this.responseDataResult = false;
          return this.router.navigate(['/sign-in']);
        }
      })
    }
    else {
      return 'Please Enter Valid Username / Password.'
    }
  }

}
