import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Product } from '../Product';
import { UserService } from '../user.service';
import { User } from '../User';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  orderForm : FormGroup
  products : Product[] = null;
  users: User[] = null;

  constructor(private productService : ProductService, private formBuilder: FormBuilder,
    private auth: AuthService, private userService: UserService, private orderService: OrderService) 
  {
    this.orderForm = formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      productId: ['', Validators.required],
      evaluatorId: ['', Validators.required]
    })
  }

  async ngOnInit() {
    this.products = await this.productService.getProducts();
    this.users = await this.userService.getUsers();
    console.log(this.auth.user.id);
  }

  async onSubmit() : Promise<void>{
    console.log("hello");
    var name = this.orderForm.controls.name.value;
    var quantity = this.orderForm.controls.quantity.value;
    var productId = this.orderForm.controls.productId.value;
    var evaluatorId = this.orderForm.controls.evaluatorId.value;
    var petitionerId = this.auth.user.id;
    await this.orderService.makeOrder(name, productId, petitionerId, quantity, evaluatorId);
  }

}
