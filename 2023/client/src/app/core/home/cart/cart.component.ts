import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent {
  constructor(public data: DataService) { }

  ngOnInit(): void {
  }

  calcItemSubtotal(item: { price: any; discount: any; quantity: number; }){

    let price = item.price
    , discount = item.discount;

    if (discount) {
      if (discount.toString().includes('%'))
        price -= (price * (parseInt(discount) / 100));
      else
        price -= discount;
    }
    
    return price * item.quantity;
  }

  getCartTotal(){
    
    return this.data.cart.reduce((a: number, item: { price: any; discount: any; quantity: number; }) => a + this.calcItemSubtotal(item), 0);
  }

  proceedTheOrder(){
    console.log('proceed the order')
  }

  removeItemFromOrder(i: number){
    this.data.cart.splice(i, 1);
  }

  changeQuantity(item: { quantity: number; }, increase: any){

    if(increase)
      item.quantity++;
    //descrease upto 1
    else if(item.quantity > 1)
      item.quantity--;
  }
}
