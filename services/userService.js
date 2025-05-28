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

/**
 * Get a specific user by ID
 * @route GET /users/:id
 */
exports.getUser = async (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { userId: req.params.id },
  };

  try {
    const result = await dynamoDb.get(params).promise();

    if (result.Item) {
      // All fields like name, email, age, phone, address will be returned
      res.json(result.Item);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Could not fetch user", details: err });
  }
};

/**
 * Update a specific user by ID
 * @route PUT /users/:id
 */
exports.updateUser = async (req, res) => {
  const { name, email, age, phone, address } = req.body;
  const { id } = req.params;

  const params = {
    TableName: TABLE_NAME,
    Key: { userId: id },
    UpdateExpression:
      "set #name = :name, #email = :email, #age = :age, #phone = :phone, #address = :address",

    ExpressionAttributeNames: {
      "#name": "name",
      "#email": "email",
      "#age": "age",
      "#phone": "phone",
      "#address": "address",
    },
    ExpressionAttributeValues: {
      ":name": name,
      ":email": email,
      ":age": age,
      ":phone": phone,
      ":address": address,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const result = await dynamoDb.update(params).promise();
    res.json(result.Attributes);
  } catch (err) {
    res.status(500).json({ error: "Could not update user", details: err });
  }
};

/**
 * Delete a user by ID
 * @route DELETE /users/:id
 */
exports.deleteUser = async (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { userId: req.params.id },
  };

  try {
    await dynamoDb.delete(params).promise();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Could not delete user", details: err });
  }
};
