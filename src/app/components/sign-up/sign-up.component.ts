import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PizzaAppService } from 'src/app/services/pizza-app.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  name = new FormControl('', [Validators.required, Validators.pattern('[a-zA-z ]+')]);
  email = new FormControl('', [Validators.required, Validators.email]);
  mobile = new FormControl('', [Validators.required, Validators.maxLength(12)]);
  address = new FormControl('', [Validators.required, Validators.pattern('[a-zA-z ]+')]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  responseData: any;
  responseDataResult: any;

  constructor(private pizzaAppService: PizzaAppService, private router: Router) { }

  ngOnInit(): void {
  }

  getNameMessage() {
    if (this.name.hasError('required')) {
      return "Please Enter Name";
    }
    else {
      return this.name.hasError('pattern') ? 'Not a Valid Name' : '';
    }
  }

  getEmailMessage() {
    if (this.email.hasError('required')) {
      return 'Please Enter Email';
    }
    else {
      return this.email.hasError('email') ? 'Not a Valid Email' : '';
    }
  }

  getMobileMessage() {
    if (this.mobile.hasError('required')) {
      return "Please Enter Mobile";
    } else if (this.mobile.hasError('maxlength')) {
      return "Mobile Number Exceeds Max Length Limit";
    }
    else {
      return true;
    }
  }

  getAddressMessage() {
    if (this.address.hasError('required')) {
      return "Please Enter Address";
    } else {
      return this.address.hasError('pattern') ? 'Not a Valid Address' : '';
    }
  }

  getUsernameMessage() {
    if (this.username.hasError('required')) {
      return "Please Enter Username";
    } else {
      return true;
    }
  }

  getPasswordMessage() {
    if (this.password.hasError('required')) {
      return "Please Enter Password";
    } else {
      return true;
    }
  }

  onSubmit() {
    var formData = {
      name: this.name.value,
      email: this.email.value,
      mobile: this.mobile.value,
      address: this.address.value,
      username: this.username.value,
      password: this.password.value,
    }
    this.pizzaAppService.addUser(formData).subscribe(res => {      
      this.responseData = res;
      if (this.responseData.success == "1") {
        this.responseDataResult = true;
        return this.router.navigate(['/sign-in']);
      } else {
        this.responseDataResult = false;
        return this.router.navigate(['/sign-up']);
      }
    })
  }


}
