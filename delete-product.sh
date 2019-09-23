#!/bin/bash

curl -H "Content-Type: application/json" -X DELETE "http://localhost:4000/products/$@/delete"
echo -e "\n"
