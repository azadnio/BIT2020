import IItem from "./item";

export default interface IInvoiceItem extends IItem{
  InvoiceId: number;
  ItemId: number;
  Price: number;
  Quantity: number;
}
 