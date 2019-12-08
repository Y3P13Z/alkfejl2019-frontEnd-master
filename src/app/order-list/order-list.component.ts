import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../Product';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  productForm : FormGroup;
  products : Product[] = [];

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient,
     private auth: AuthService, private productService : ProductService, private router : Router) {

  this.productForm = formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    quantity: ['', Validators.required]
  })}
  
  async ngOnInit() {
    this.products = await this.productService.getProducts();     
  }

  async onSubmit(){
    var name = this.productForm.controls.name.value;
    var price = this.productForm.controls.price.value;
    var quantity = this.productForm.controls.quantity.value;
    var product = await this.productService.addProduct(name, price, quantity);
    this.products.push(product);
  }

  async onDeleteClick(id: number) {
    await this.productService.deleteProduct(id)
    .then(async () => {     
      this.products = await this.productService.getProducts();
    })
  }

}
