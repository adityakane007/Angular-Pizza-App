import { Component, OnInit } from '@angular/core';
import { PizzaAppService } from 'src/app/services/pizza-app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  cartCount = 0;
  constructor(private pizzaAppService: PizzaAppService) { }

  ngOnInit(): void {
    if (localStorage.getItem('username') != undefined) {
      this.isLoggedIn = this.pizzaAppService.isLoggedIn();
    }
    if (localStorage.getItem('addToCart') != undefined) {
      let data: any = localStorage.getItem('addToCart');
      let menuArray = JSON.parse(data);
      this.cartCount = menuArray.length;
    }

    this.pizzaAppService.getCartMenu().subscribe(data => {
      this.cartCount = data.length;
    })

  }

  signOut() {
    Swal.fire({
      title: 'Do you want to Logout?',      
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000000',
      confirmButtonText: 'Yes',
      cancelButtonColor: 'yellow',    
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pizzaAppService.isLoggedOut();
      }
    })
  }

}
