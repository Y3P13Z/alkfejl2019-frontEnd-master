import { Injectable } from '@angular/core';
import { AuthService, httpOptions } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private auth : AuthService, private httpClient: HttpClient) { }

  getProducts() : Promise<Product[]>{
    return this.httpClient.get<Product[]>("http://localhost:8080/product/getAll", httpOptions).toPromise();
  }

  addProduct(name: String, price: number, quantity: number) : Promise<Product>{
    return this.httpClient.post<Product>("http://localhost:8080/product/add",{name, price, quantity} ,httpOptions).toPromise();
  }

  deleteProduct(id : number): Promise<Product> {
    return this.httpClient.delete<Product>("http://localhost:8080/product/delete/" + id , httpOptions).toPromise();
  }

  getProduct(id: number): Promise<Product> {
    return this.httpClient.get<Product>("http://localhost:8080/product/" + id, httpOptions).toPromise();
  }

  editProduct(id: number, name: String, price: number, quantity: number): Promise<Product> {
    return this.httpClient.patch<Product>("http://localhost:8080/product/update/" + id, {name, price, quantity},  httpOptions).toPromise();
  }

}
