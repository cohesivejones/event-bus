FROM mongo

COPY data.json /data.json
CMD mongoimport --host products_db --db app --collection products --type json --file /data.json --jsonArray
