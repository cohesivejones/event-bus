# event bus
## purpose
This repo sets up two microservices products and catalogs that communicate via
and event bus. The product service emits PRODUCT_CREATED and PRODUCT_DELETED events
which are consumed by the catalogs service to create and destory catalog records.

## setup instructions
1. Install docker
2. Run `docker-compose up`

## using the product service
navigate to http://localhost:4000/products for a list of products

## using the catalog service
navigate to http://localhost:4001/catalogs for a list of catalogs

## create products
1. run `./create-product` to create products in the product serice
2. navigate to http://localhost:4000/products to see the newly created product
2. navigate to http://localhost:4001/catalogs to see the newly created catalog

## delete products
1. run `./delete-product [product-id]` to delete product from the product service
2. navigate to http://localhost:4000/products to see the updated list of products
2. navigate to http://localhost:4001/catalogs to see the updated list of catalog

