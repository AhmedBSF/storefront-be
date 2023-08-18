# Requirements

## Data Shapes


### Products

- id
- name
- price
- [OPTIONAL] category

### Users

- id
- firstName
- lastName
- password

### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

### Order Products

- id
- products_id
- order_id
- quantity
