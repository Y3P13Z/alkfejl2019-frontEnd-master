import { NgModule } from '@angular/core';
import { Routes, RouterModule, RoutesRecognized } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { OrderListComponent } from './order-list/order-list.component';
import { RegisterComponent } from './register/register.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderComponent } from './order/order.component';
import { AcceptOrderComponent } from './accept-order/accept-order.component';


const routes: Routes = [
  {path:'', component: LoginFormComponent},
  {path:'order', component: OrderListComponent},
  {path:'register', component: RegisterComponent},
  {path:'product/:id', component: ProductDetailComponent},
  {path:'orders', component: OrderComponent},
  {path:'acceptOrders', component: AcceptOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
