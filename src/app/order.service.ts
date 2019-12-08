import { Injectable } from '@angular/core';
import { AuthService, httpOptions } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Order } from './Order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private auth : AuthService, private httpClient: HttpClient) { }

  makeOrder(name:string, productId: number, petitionerId: number, quantity: number, evaluatorId: number) : Promise<Order>{
    return this.httpClient.post<Order>("http://localhost:8080/order/add",{name,productId,petitionerId, quantity, evaluatorId} ,httpOptions).toPromise();
  }

  getOrdersOfEvaluator(id: number) : Promise<Order[]>{
    return this.httpClient.get<Order[]>("http://localhost:8080/order/" + id, httpOptions).toPromise();
  }

  acceptOrder(id : number) : Promise<Order>{
    return this.httpClient.post<Order>("http://localhost:8080/order/changeStatus", {orderId: id, status: "ACCEPTED"}, httpOptions).toPromise();
  }

  declineOrder(id : number) : Promise<Order>{
    return this.httpClient.post<Order>("http://localhost:8080/order/changeStatus", {orderId: id, status: "DECLINED"}, httpOptions).toPromise();
  }
}
