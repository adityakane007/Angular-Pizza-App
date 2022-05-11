import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PizzaAppService } from 'src/app/services/pizza-app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name = new FormControl('', [Validators.required, Validators.pattern('[a-zA-z ]+')]);
  email = new FormControl('', [Validators.required, Validators.email]);
  mobile = new FormControl('', [Validators.required, Validators.maxLength(12)]);
  address = new FormControl('', [Validators.required, Validators.pattern('[a-zA-z ]+')]);
  username = new FormControl('', [Validators.required]);

  responseData: any;
  responseDataResult: any;
  userInfo: any;
  userId: any;
  constructor(private pizzaAppService: PizzaAppService, private router: Router) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("username");
    this.pizzaAppService.getUserById(this.userId).subscribe(res => {
      this.userInfo = res.data;
    })
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

  onSubmit() {
    var userId = this.username.value;
    var formData = {
      name: this.name.value,
      email: this.email.value,
      mobile: this.mobile.value,
      address: this.address.value,
      username: this.username.value
    }
    this.pizzaAppService.editUser(userId, formData).subscribe(res => {
      this.responseData = res;
      if (this.responseData.success == "1") {
        Swal.fire({
          icon: 'success',
          title: 'Great',
          text: 'Your Profile Updated Successfully',
          confirmButtonColor: '#000000',
          confirmButtonText: 'Okay',         
        }
        )
        this.responseDataResult = true;
        return this.router.navigate(['/menu-dashboard']);
      } else {
        this.responseDataResult = false;
        return this.router.navigate(['/profile']);
      }
    })
  }

}
