# Instructions

## Steps

1. Install the dependencies:

   ```bash
   npm i
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Create a new user:

   ```bash
   curl -X POST http://localhost:3000/user
   ```

4. Top up the balance of user with ID 1:

   ```bash
   curl -X POST http://localhost:3000/top-up-balance -d '{"userId": 1, "amount": 300}' -H "Content-Type: application/json"
   ```

5. Buy an item with the price of 100 for user with ID 1:

   ```bash
   curl -X POST http://localhost:3000/buy-item -d '{"userId": 1, "price": 100}' -H "Content-Type: application/json"
   ```

6. Get the list of available items:
   ```bash
   curl http://localhost:3000/items
   ```

## Environment Variables

```bash
DATABASE_URL=postgresql://username:root@localhost:5432/test_database?schema=public
```

## Notes

1. **Get items**:

   - `min_price` – Not the tradable price of the item.
   - `min_tradable_price` – The tradable price of the item.

2. **Buy item**:

   - Since there is no item table in the database, "buying an item" only deducts the user's balance.

3. **Pagination, authentication, test, etc.**:
   - These features were not part of the requirements, so they are not included in the current solution. However, they can be added if needed.
