// Import AWS SDK , UUID for unique ID generation
const AWS = require("aws-sdk");

// Create a DynamoDB DocumentClient instance
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Get the table name from env variables
const TABLE_NAME = process.env.USERS_TABLE;

/**
 * Get all user
 * @route GET /users
 */
exports.getAllUsers = async (req, res) => {
  try {
    const result = await dynamoDb.scan({ TableName: TABLE_NAME }).promise();
    res.status(200).json(result.Items); // returns all user records
  } catch (err) {
    res.status(500).json({ error: "Error fetching users", details: err });
  }
};
