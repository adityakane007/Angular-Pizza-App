import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PizzaAppService } from 'src/app/services/pizza-app.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  userInfo: any;
  userId: any;
  constructor(private pizzaAppService: PizzaAppService, private router: Router) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("username");
    this.pizzaAppService.getUserById(this.userId).subscribe(res => {
      this.userInfo = res.data;
    })
  }

  editProfile() {
    return this.router.navigate(['/edit-profile']);
  }

}
