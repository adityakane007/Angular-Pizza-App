import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PizzaAppService } from 'src/app/services/pizza-app.service';
import Swal from 'sweetalert2';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit, AfterViewInit {

  //@ViewChild(CartComponent) cartDetails!: CartComponent;

  stripeAPIKey: any = "pk_test_51KxODjSIPY656nCfidEyRvwnabtOlYSvH1lx9f4wby2AWHpMX1XpW4fnbqhL5LxbEEN5oKgAdFPp91sAB4HBgOcJ003RRnLEeq";
  paymentHandler: any = null;
  cartData: any = null;
  amountPay: any;
  responseData: any;
  responseDataResult: any;
  tokenDtls: any;

  constructor(private activatedRoute: ActivatedRoute, private pizzaAppService: PizzaAppService, private router: Router) { }

  ngOnInit(): void {
    // this.cartData = this.activatedRoute.snapshot.params['cartData'];
    // this.amountPay = this.activatedRoute.snapshot.params['amount'];
    this.cartData = localStorage.getItem("addToCart");
    this.amountPay = localStorage.getItem("menuTotal");
    this.invokeStripe();
  }

  ngAfterViewInit(): void {
    console.log();
    // this.cartData = this.cartDetails.getCartData();
    // this.amountPay = this.cartDetails.getTotalAmt();
  }

  makePayment(amount: any, cartData: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeAPIKey,
      locale: 'auto',
      token: function (stripeToken: any) {
        this.tokenDtls = stripeToken;
        processPayment(amount, cartData, this.tokenDtls);
      },
    });

    const processPayment = (amount: any, cartData: any, tokenData: any) => {
      this.pizzaAppService.checkOut(amount, cartData, tokenData).subscribe((res: any) => {
        this.responseData = res;
        if (this.responseData.success == "1") {
          this.responseDataResult = true;
          this.pizzaAppService.isLoggedIn();
          localStorage.removeItem("addToCart");
          localStorage.removeItem("menuTotal");
          Swal.fire({
            icon: 'success',
            title: 'Great',
            text: 'Payment Successfully Done',
            confirmButtonColor: '#000000',
            confirmButtonText: 'Okay',
          }
          )
          return this.router.navigate(['/order']);
        } else {
          this.responseDataResult = false;
          //return this.router.navigate(['/sign-in']);
        }
      })
    }

    paymentHandler.open({
      name: 'Super Delicious Pizza',
      description: 'Super Delicious Pizza',
      amount: ((amount * 1) + (253 * 1)) * 100,
    });
  }



  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripeAPIKey,
          locale: 'auto',
          token: function (stripeToken: any) {
            Swal.fire({
              icon: 'success',
              title: 'Great',
              text: 'Payment Successfully Done',
              confirmButtonColor: '#000000',
              confirmButtonText: 'Okay',
            }
            )
            //return this.router.navigate(['/order']);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

}
