var updateAd = function() {};
var databaseUrl = "mongodb://localhost:27017/PropertyHub";

updateAd.get = function(req, res) {
    if(req.body) {
        var collections = ['propertyList'];
        var db = require("mongojs").connect(databaseUrl, collections);

        db.propertyList.find({id: req.query.id}, function(err, prop) {
            if( err ) {
                //todo:
                return;
            }
            if(prop && prop.length) {
                res.render('updateAd', {
                    firstname: req.query.firstname,
                    property: prop[0],
                    agent_email: prop[0].agent_id
                });
            }
            else {
                // todo
            }
        });
    }
};

updateAd.post = function(req, res) {
    if(req.body) {
        var collections = ['propertyList'];
        var db = require("mongojs").connect(databaseUrl, collections);

        db.propertyList.update({id: req.body.id}, req.body);

        res.render('adPost_success', {
                        firstname: req.body.agent_firstname,
                        message: "Ad posting is successully updated",
                        link: "/adPost?agent_id="+req.body.agent_id,
                        primary_function: "Post another Ad"
                    });
    }
};

updateAd.deleteAd = function(req, res) {
    if(req.body) {
        var collections = ['propertyList'];
        var db = require("mongojs").connect(databaseUrl, collections);

        db.propertyList.remove({id: req.query.id});

        res.redirect("/adManage?firstname="+req.query.firstname+"&agent_id="+req.query.agent_id);
    }
};

module.exports = updateAd;