#!/bin/bash

curl -d '{"name":"new product", "price":60}' -H "Content-Type: application/json" -X POST "http://localhost:4000/products/create"
echo -e "\n"
