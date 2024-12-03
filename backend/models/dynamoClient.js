const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: 'us-west-2', // Update to your preferred region
});

const putItem = async (table, item) => {
  const params = {
    TableName: table,
    Item: item,
  };
  return dynamoDB.put(params).promise();
};

const getItem = async (table, key) => {
  const params = {
    TableName: table,
    Key: { path: key },
  };
  const result = await dynamoDB.get(params).promise();
  return result.Item;
};

const deleteItem = async (table, key) => {
  const params = {
    TableName: table,
    Key: { path: key },
  };
  return dynamoDB.delete(params).promise();
};

const scanTable = async (table) => {
  const params = { TableName: table };
  const result = await dynamoDB.scan(params).promise();
  return result.Items;
};

module.exports = {
  putItem,
  getItem,
  deleteItem,
  scanTable,
};
