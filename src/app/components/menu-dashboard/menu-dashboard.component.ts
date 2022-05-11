import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PizzaAppService } from 'src/app/services/pizza-app.service';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.component.html',
  styleUrls: ['./menu-dashboard.component.css']
})
export class MenuDashboardComponent implements OnInit {

  menuData: any;
  resData: any;
  cartMenuAdd: any;
  constructor(private pizzaAppService: PizzaAppService, private router: Router) {
    this.pizzaAppService.getAllMenuItems().subscribe(res => {
      this.resData = res;
      if (this.resData.success == "1") {
        this.menuData = this.resData.data;        
      }
    })
  }

  ngOnInit(): void {
  }

  addToCartMenu(menuDtls: any) {
    if (localStorage.getItem('addToCart') != undefined) {
      let data: any = localStorage.getItem('addToCart');
      let menuArray = JSON.parse(data);
      let checkMenuExists = menuArray.some(function (element: any) {
        return element.pk_id === menuDtls.pk_id;
      });
      if (checkMenuExists) {
        this.cartMenuAdd = "already added";
      } else {
        menuArray.push(menuDtls);
        localStorage.setItem('addToCart', JSON.stringify(menuArray));
        this.pizzaAppService.addToCartMenu(menuArray);
        this.cartMenuAdd = "added";
      }
    } else {
      let menuArray = [];
      menuArray.push(menuDtls);
      localStorage.setItem('addToCart', JSON.stringify(menuArray));
      this.pizzaAppService.addToCartMenu(menuArray);
      this.cartMenuAdd = "added";
    }
  }



}
