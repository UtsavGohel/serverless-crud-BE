// Import AWS SDK , UUID for unique ID generation
const AWS = require("aws-sdk");

const { v4: uuidv4 } = require("uuid");

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

/**
 * Create a new user
 * @route POST /users
 */
exports.createUser = async (req, res) => {
  console.log("req.body =", req.body);

  const { name, email, age, phone, address } = req.body;
  const userId = uuidv4();

  const params = {
    TableName: TABLE_NAME,
    Item: { userId, name, email, age, phone, address },
  };

  try {
    await dynamoDb.put(params).promise();
    res.status(201).json({ userId, name, email, age, phone, address });
  } catch (err) {
    res.status(500).json({ error: "Could not create user", details: err });
  }
};
