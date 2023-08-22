# Requirements

## Endpoints

BASE_URL = http://localhost:3000

### Users Endpoints

```http
POST /users
GET /users
GET /users/:id
POST /users/authenticate
```

### Products Endpoints

```http
POST /products
GET /products
GET /products/:id
```

### Orders Endpoints

```http
POST /orders
GET /orders
GET /orders/:id
POST /orders/add
```

## Data Shapes

### Products

```sql
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price VARCHAR(50) NOT NULL,
  category VARCHAR(50)
```

### Users

```sql
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL

```

### Orders

```sql
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  status VARCHAR(50) NOT NULL
```

### Order Products

```sql
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) NOT NULL,
  order_id INTEGER REFERENCES orders(id) NOT NULL,
  quantity INTEGER NOT NULL

```
