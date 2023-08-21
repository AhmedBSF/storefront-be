import Client from "../database";

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderModel {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get orders ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
      const result = await conn.query(sql, [o.user_id, o.status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create new order for user ${o.user_id}. Error: ${err}`
      );
    }
  }

  async addToOrder(op: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO order_products (product_id, order_id, quantity) VALUES($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [
        op.product_id,
        op.order_id,
        op.quantity,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product${op.quantity > 1 && "s"} to order ${
          op.order_id
        }. Error: ${err}`
      );
    }
  }
}
