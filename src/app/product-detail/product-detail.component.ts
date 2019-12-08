import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

public product : Product = null;
editProductForm : FormGroup;

  constructor(private productService : ProductService,
     private route: ActivatedRoute, private formBuilder : FormBuilder) 
     {
      this.editProductForm= formBuilder.group({
        name: ['', Validators.required],
        price: ['', Validators.required],
        quantity: ['', Validators.required]
      })
      }

  async ngOnInit(): Promise<void> {
    const id = +this.route.snapshot.paramMap.get('id');
    this.product = await this.productService.getProduct(id);
  }

  async onSubmit() : Promise<void> {
    var name = this.editProductForm.controls.name.value;
    var price = this.editProductForm.controls.price.value;
    var quantity = this.editProductForm.controls.quantity.value;
    const id = +this.route.snapshot.paramMap.get('id');
    this.product = await this.productService.editProduct(id, name, price, quantity);
  }


}
