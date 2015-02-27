var adPost = function() {};
var databaseUrl = "mongodb://localhost:27017/PropertyHub";
var agentId = '';

adPost.get = function(req, res) {
    var collections = ['agentList'];
    var db = require("mongojs").connect(databaseUrl, collections);
    agentId = req.query.agent_id;
    db.agentList.find({email: agentId}, function(err, agent) {
        if( ( agent || agent.length ) && !err ) {
            res.render('adPost', {firstname: agent[0].firstname, email: agentId});
        }
    });
};

adPost.post = function(req, res) {
    console.log("POST: adPost");
    console.log(req.body);
    if(req.body) {
        var collections = ['agentList', 'propertyList'];
        var db = require("mongojs").connect(databaseUrl, collections);
        var property = {};
        db.agentList.find({email: req.body.contact_email}, function(err, agent) {
            if( !( agent || agent.length ) || err ) {
                return;
            }
            //var propertyCount = db.propertyList.find().count();
            //console.log(propertyCount);
            property.id = req.body.property_name + "$" + req.body.unit_number + "$" + req.body.contact_email;
            db.propertyList.find({id: property.id}, function(err, p){
                property.agent_id = req.body.contact_email;
                property.agent_firstname = agent[0].firstname;
                property.agent_lastname = agent[0].lastname;
                property.agent_number = agent[0].phone;
                property.name = req.body.property_name;
                property.unit_number = req.body.unit_number;
                property.street_1 = req.body.street_1;
                property.street_2 = req.body.street_2;
                property.city = req.body.city;
                property.state = req.body.state;
                property.zip = req.body.zip;
                property.management = req.body.management;
                property.property_type = req.body.property_type;
                property.contract_type = req.body.contract_type;
                property.price = req.body.price;
                property.sqft = req.body.sqft;
                property.bedrooms = req.body.bedrooms;
                property.bathrooms = req.body.bathrooms;
                property.description = req.body.description;
                property.status = 'Available';

                if( p && p.length ) {
                    db.propertyList.update({id: property.id}, property);
                    res.render('adPost_success', {
                        firstname: agent[0].firstname,
                        message: "Similar ad already exists for the property. So updated the previous ad",
                        link: "/adPost?agent_id="+req.body.contact_email,
                        primary_function: "Post another Ad"
                    });
                    return;
                }
                else {
                    db.propertyList.save(property);

                    res.render('adPost_success', {
                        firstname: agent[0].firstname,
                        message: "Your ad is successfully posted",
                        link: "/adPost?agent_id="+req.body.contact_email,
                        primary_function: "Post another Ad"
                    });
                }
            });
        });

    }
};

module.exports = adPost;