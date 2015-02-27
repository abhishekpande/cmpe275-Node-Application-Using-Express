var result = function() {};
var databaseUrl = "mongodb://localhost:27017/PropertyHub";

result.get = function(req, res) {
    console.log("GET: "+req.query.id);

    if(req.body) {
        var collections = ['propertyList'];
        var db = require("mongojs").connect(databaseUrl, collections);

        db.propertyList.find({id: req.query.id}, function(err, prop) {
            if( err ) {
                //todo:
                return;
            }
            if(prop && prop.length) {
                res.render('result', {
                    firstname: req.query.firstname,
                    property_name: prop[0].name,
                    property: prop[0],
                    agent_email: prop[0].agent_id
                });
            }
            else {
                res.render('search_noresult', {backlink: '/search?firstname='+req.query.firstname});
            }
        });
    }
};

module.exports = result;