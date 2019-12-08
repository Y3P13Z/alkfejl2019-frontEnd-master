import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Order } from '../Order';

@Component({
  selector: 'app-accept-order',
  templateUrl: './accept-order.component.html',
  styleUrls: ['./accept-order.component.css']
})
export class AcceptOrderComponent implements OnInit {
  orders : Order[] = null;

  constructor(private auth: AuthService, private orderService: OrderService) { }
  
  async ngOnInit() {
    var id = this.auth.user.id;
    this.orders = await this.orderService.getOrdersOfEvaluator(id);
  }

  async onAcceptClick(id: number){
    await this.orderService.acceptOrder(id).then(async () => {     
      this.orders = await this.orderService.getOrdersOfEvaluator(id);
    })
  }

  async onDeclineClick(id:number){
    await this.orderService.declineOrder(id).then(async () => {     
      this.orders = await this.orderService.getOrdersOfEvaluator(id);
    })
  }

}
