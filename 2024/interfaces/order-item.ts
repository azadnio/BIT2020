import IItem from "./item";

export default interface IOrderItem extends IItem{
  OrderId: number;
  ItemId: number;
  Price: number;
  Quantity: number;
}
 