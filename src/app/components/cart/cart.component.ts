import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PizzaAppService } from 'src/app/services/pizza-app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartData: any = [];
  quantity: any;
  menuTotal: number = 0;
  responseData: any;
  responseDataResult: any;
  constructor(private pizzaAppService: PizzaAppService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("addToCart") != undefined) {
      let data: any = localStorage.getItem("addToCart");
      this.cartData = JSON.parse(data);
      for (let menuPrice of this.cartData) {
        this.menuTotal = this.menuTotal + menuPrice.price;
        this.cartData['menuTotal'] = this.menuTotal;
        this.cartData['username'] = localStorage.getItem("username");
      }
    } else {

    }
  }

  /*onKeyUp(event: any) {
    alert(event.target.value);
    this.quantity = event.target.value;
  }*/

  removedMenu(menuId: any) {
    let data: any = localStorage.getItem('addToCart');
    let menuArray = JSON.parse(data);
    console.log(menuArray);
    for (let menuData of menuArray) {
      if (menuData.pk_id == menuId) {
        menuArray.splice((menuArray.indexOf(menuData)), 1);
        localStorage.setItem('addToCart', JSON.stringify(menuArray));
        this.pizzaAppService.addToCartMenu(menuArray);
        // this.router.navigate((['/cart']));
        window.location.reload();
      }
    }
  }

  checkOut(cartData: any) {
    console.log(this.cartData);
    this.pizzaAppService.checkOut(cartData, null, null).subscribe(res => {
      this.responseData = res;
      if (this.responseData.success == "1") {
        this.responseDataResult = true;
        this.pizzaAppService.isLoggedIn();
        localStorage.removeItem("addToCart");
        return this.router.navigate(['/order']);
      } else {
        this.responseDataResult = false;
        //return this.router.navigate(['/sign-in']);
      }
    })
  }

  makePayment(cartData: any, menuTotal: any) {
    //this.router.navigate(['/make-payment', { cartData: JSON.stringify(cartData), amount: menuTotal }]);
    localStorage.setItem('menuTotal', menuTotal);
    this.router.navigate(['/make-payment']);
  }

  getCartData() {
    return this.cartData;
  }

  getTotalAmt() {
    return this.menuTotal;
  }

}
