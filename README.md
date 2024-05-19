# CAPSTONE2
### E-COMMERCE API DOCUMENTATION

**Installation:**

```npm install```

**User Credentials:**
- Admin User:
    - email: admin123@mail.com
    - pwd: admin123
- Non-Admin User:
     - email: user@mail.com
     - pwd: user123
    

**ROUTES:**

***User Resource***
- User registration (POST)
	- /users/login
    - auth token required: NO
    - request body: 
        - email (string)
        - password (string)
        - firstName (string)
- User authentication (POST)
	- /users
    - auth token required: NO
    - request body: 
        - email (string)
        - password (string)

***Product Resource***
- Create Product (Admin only) (POST)
	- /products/create
    - auth token required: YES (ADMIN)
    - request body: 
        - name: product1
        - description product1
        - price 100
        - quantity: 5

    (Product 2)
        - name: product2
        - description product2
        - price 200
        - quantity: 6
        
- Retrieve all products (Admin only) (GET)
	- /products/all
    - auth token required: YES (ADMIN)
    - request body: none
- Retrieve all active products (GET)
	- /products
    - auth header required: NO
	- request body: none

    ***Cart Resource***
- Get User's Cart (GET)
    - /cart
    - Auth Token Required: YES (Verified User only)
    - Request Body: none

- Add to Cart (POST)
    - /cart/add-to-cart
    - Auth Token Required: YES (Verified User only)
    - Request Body:
    - productId (string)
    - quantity (number)
    - subtotal (number)

- Update Cart (PATCH)
    - /cart/update-cart
    - Auth Token Required: YES (Verified User only)
    - Request Body:
    - productId (string)
    - quantity (number)

- Remove from Cart (PATCH)
    - /cart/:productId/remove-from-cart
    - Auth Token Required: YES (Verified User only)
    - Request Params:
    - productId (string)

- Clear Cart (PATCH)
    - /cart/clear-cart
    - Auth Token Required: YES (Verified User only)
    - Request Body: none

- Search Products by Name (POST)
    - /cart/search-products-by-name
    - Request Body:
    - name (string)

- Search Products by Price Range (POST)
    - /cart/search-products-by-price
    - Request Body:
    - minPrice (number)
    - maxPrice (number)

   ***Order Resource***
- Create Order (POST)
    - /orders/checkout
    - Auth Token Required: YES (Verified User only)
    - Request Body:
        - firstName (string)
        - lastName (string)
        - products (array of objects):
        - productId (string)
        - quantity (number)

- Retrieve User's Orders (POST)
    - /orders/my-orders
    - Auth Token Required: YES (Verified User only)
    - Request Body: none

- Retrieve All Orders (ADMIN)
    - Retrieve all orders (GET)
    - /orders/all-orders
    - Auth Token Required: YES (Admin)
    - Request Body: none