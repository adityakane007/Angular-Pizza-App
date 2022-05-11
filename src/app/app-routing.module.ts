
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MakePaymentComponent } from './components/make-payment/make-payment.component';
import { MenuDashboardComponent } from './components/menu-dashboard/menu-dashboard.component';
import { OrderComponent } from './components/order/order.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { AuthGuardServiceService } from './services/auth-guard-service.service';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'menu-dashboard', component: MenuDashboardComponent, canActivate: [AuthGuardServiceService] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardServiceService] },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuardServiceService] },
  { path: 'make-payment', component: MakePaymentComponent, canActivate: [AuthGuardServiceService] },
  { path: 'view-profile', component: ViewProfileComponent, canActivate: [AuthGuardServiceService] },
  { path: 'edit-profile', component: ProfileComponent, canActivate: [AuthGuardServiceService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
