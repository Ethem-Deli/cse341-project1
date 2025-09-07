const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Get all contacts
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection("contacts").find();
    result.toArray().then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single contact
const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("contacts")
      .find({ _id: contactId });
    result.toArray().then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle };
