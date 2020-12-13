var airtable = require("../utils/constant");
const User = require('../models/user.model.js');
const mail = require('../utils/mailgun');

var Airtable = require('airtable');
var base = new Airtable({apiKey: airtable.airTableCredentail.apiKey }).base(airtable.airTableCredentail.app);

// Create and Save a new 
exports.create = async (req, res) => {
    try {
        // Validate request
    if(!req.body.email || !req.body.name || !req.body.mobile) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Create a User
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        mobile: req.body.mobile

    });

    // Save User in the database
    await user.save()

    //save data in airtable
    base('user').create([
        {
            "fields": {
                "name": req.body.name,
                "email": req.body.email,
                "mobile": req.body.mobile,
            }
        }
    ], function(err, records) {
        if (err) {
            console.error(err);
            return;
        }
        records.forEach(function (record) {
            console.log(record.getId());
        });
    });
    // sending data in mail gun  
    // let array = []
    // array.push(req.body.email)
    // let subject = 'welcome'
    // let text  = `Welcome to our app ${JSON.stringify(user)}`
    // await mailsendMail(array.toString(), subject, text)
    // sending data in mail gun  
    res.send(user);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User"
        });
    }
}

