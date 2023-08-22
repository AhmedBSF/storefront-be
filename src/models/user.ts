import Client from "../database";
import bcrypt from "bcrypt";
import config from "../config";

export type User = {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (username, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *";
      const hash = bcrypt.hashSync(
        u.password + config.pepper,
        parseInt(config.salt as unknown as string)
      );
      const result = await conn.query(sql, [
        u.username,
        u.first_name,
        u.last_name,
        hash,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create new user ${u.username}. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT password FROM users WHERE username=($1)";
      const result = await conn.query(sql, [username]);

      if (result.rows.length) {
        const res = result.rows[0];
        console.log(res);
        const isValidPassword = bcrypt.compareSync(
          password + config.pepper,
          res.password
        );
        if (isValidPassword) return res;
      }
      conn.release();
      return null;
    } catch (err) {
      throw new Error(`Could not authenticate user ${username}. Error: ${err}`);
    }
  }
}
