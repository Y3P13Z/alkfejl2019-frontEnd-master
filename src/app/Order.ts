import { User } from './User';
import { Product } from './Product';

export class Order{

    id: number;
    petitionerId: number;
    evaluator : User;
    product: Product;
    totalPrize: number;
    quantity: number;
    status: String;
    
    constructor(){}
}