const mongodb = require('../db/connect');
const { ObjectId } = require('bson');

const getAllContacts = async (req, res, next) => {
  try { 
    // Get the database object & report name  
    const db = mongodb.getDb().db();    
    console.log("Connected to DB:", db.databaseName); 
    // Get the "user" "collection" in other words table
    const collection = db.collection('contacts'); 
    // Get all "documents" in other words table rows or entries  
    const result = await collection.find();
    // Turn each entry into an item in a list 
    const contactsInfoList = await result.toArray();
    // See if there is anyting in the table or "collection" & report
    var entries = contactsInfoList.length;
    if (entries === 0) {
      console.log("No documents found in the contacts collection.");
      return res.status(404).json({ message: "No contacts found." });
    } else {
      console.log(`There are "${entries}" documents in the contacts collection.`)
    } 
    // Get & report the name of the 1st entry in the collection
    console.log(`"${contactsInfoList[0].firstName} ${contactsInfoList[0].lastName}" is the "first & last Name" for the 1st "contacts collection entry"`);
    // Set header and get 1st entry
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contactsInfoList);
  } catch (error) {
  console.error("Error fetching data: ", error);
  res.status(500).json({ message: "Internal server error" });
  }
};

const getSpecificContact = async (req, res, next) => {
  try { 
    // Create a variable to hold the object of the contact id
    const contactId = new ObjectId(req.params.id.toString());
    // Get the database object & report name  
    const db = mongodb.getDb().db();    
    console.log("Connected to DB:", db.databaseName); 
    // Get the "user" "collection" in other words table
    const collection = db.collection('contacts'); 
    // Get all "documents" in other words table rows or entries  
    const result = await collection.find({ _id: contactId });
    // Turn each entry into an item in a list 
    const contactsInfoList = await result.toArray();
    // See if there is anyting in the table or "collection" & report
    var entries = contactsInfoList.length;
    if (entries === 0) {
      console.log("No contact found in the contacts collection matches.");
      return res.status(404).json({ message: "No matching contact found." });
    } else {
      console.log(`There is "${entries}" matching contact in the contacts collection.`)
    } 
    // Get & report the name of the 1st entry in the collection
    console.log(`"${contactsInfoList[0].firstName} ${contactsInfoList[0].lastName}" is the "first & last Name" for the matching contact in the "contacts collection entry"`);
    // Set header and get 1st entry
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contactsInfoList[0]);
  } catch (error) {
  console.error("Error fetching data: ", error);
  res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllContacts, getSpecificContact };