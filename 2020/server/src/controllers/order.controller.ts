import { OrderItem } from './../../../classes/OrderItem.calss';
import { AppErrInvalidRequest, AppErrDatabaseError, AppErrNotFound } from './../modals/apperror.class';
import { IRequestExtended, IInsertionDBResults } from './../global.interfaces';
import { Request } from 'express'
import db from '../database';
import { Order } from '../../../classes/Order.calss';
import { IsInteger } from '../validation.utils';
import { PaymentStatus } from '../global.enums';

class OrderController {

    constructor() { }

    //select or search a order
    public async select(req: Request) {

        //no id
        if (!req.query.id || !req.query.id.toString().trim())
            throw new AppErrInvalidRequest();

        //select from multiple table
        //TO DO ROLLBACK if fails

        let resolve, reject,
            result = new Promise((_res, _rej) => { resolve = _res; reject = _rej; });

        //select order master data
        db.pool.query('SELECT * FROM orders where Id = ?', [req.query.id], (error, orders) => {

            //catch db error
            if (error)
                return reject(new AppErrDatabaseError(error))
            //order not found
            else if (orders.length)
                return reject(new AppErrNotFound('Inovice Not found!'));

            //merge order data
            let order = new Order();
            order = { ...order, ...orders[0] };

            //select order items
            db.pool.query(`SELECT * FROM order_items WHERE OrderId = ${order.Id}`, (error, items) => {

                //catch db error
                if (error)
                    return reject(new AppErrDatabaseError(error))

                //merge order items
                order.Items = items;
                //resolve the promis with order
                resolve(order);
            })
        });

        return result;
    }

    public async create(req: IRequestExtended) {

        let order: Order = req.body,
            orderItems: OrderItem[] = order.Items;

        //TO DO VALIDATE ORDER

        delete order.Items;
        req.body = order;

        try {

            //insert order master data           
            let OrderInsertRslt = await db.insertSingleRecord<IInsertionDBResults>(req, 'orders');

            //insert order items
            if (OrderInsertRslt.insertId) {

                //set order id into order items
                orderItems = orderItems.map((inv: OrderItem) => ({ ...inv, OrderId: OrderInsertRslt.insertId }));

                //bulk insertion order items
                await db.insertBulkData(orderItems, 'order_items');

                //return the order master data inserted result
                return OrderInsertRslt;
            }
            else
                throw new AppErrDatabaseError('Cannot insert the order!');

        } catch (error) {
            throw error;
        }
    }

    public async update(req: IRequestExtended) {

        let order: Order = req.body,
            orderItems: OrderItem[] = order.Items;

        //TO DO VALIDATE ORDER

        //check payment made

        delete order.Items;
        req.body = order;
        let OrderId = +order.Id;

        try {

            //insert order master data           
            let OrderUpdateRslt = await db.updateSingleRecord<IInsertionDBResults>(req, 'orders', 'Order');

            //insert order items
            if (OrderUpdateRslt.affectedRows) {

                //delete exsisting order items
                await db.delete('order_items', { OrderId });

                //set order id into order items
                orderItems = orderItems.map((inv: OrderItem) => ({ ...inv, OrderId }));

                //insert current order items
                await db.insertBulkData(orderItems, 'order_items');

                //return the order master data inserted result
                return OrderUpdateRslt;
            }
            else
                throw new AppErrDatabaseError('Cannot update the order!');

        } catch (error) {
            throw error;
        }
    }

    public async updateOrderStatus(orderId: string | number, status: PaymentStatus | string): Promise<IInsertionDBResults> {

        if (!IsInteger([orderId, status]))
            throw new AppErrInvalidRequest();

        //convert to integer
        orderId = +orderId;
        status = +status;

        try {
            //update the status of order
            let result = await db.executeQuery<IInsertionDBResults>('UPDATE orders SET Status = ? WHERE Id = ?', [status, orderId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async delete(Id: string | number) {

        if (!IsInteger(Id))
            throw new AppErrInvalidRequest();

        //convert to number
        Id = +Id;

        try {
            //check is there any any payment paid for this order
            let result = await db.executeQuery('SELECT 1 FROM invoice WHERE Id = ?', [Id]) as Array<any>;

            //NOT having any payments for this order
            if (!result.length) {

                //delete order master
                let delResult = <IInsertionDBResults>await db.delete('orders', { Id })
                //delete order items
                await db.delete('order_items', { OrderId: Id });
                return delResult;
            }
            else
                throw new AppErrInvalidRequest('Order has invoice records!');

        } catch (error) {
            throw error;
        }
    }

}

export const orderController = new OrderController()