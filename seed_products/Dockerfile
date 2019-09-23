FROM mongo

COPY data.json /data.json
CMD mongoimport --host db --db app --collection products --type json --file /data.json --jsonArray
