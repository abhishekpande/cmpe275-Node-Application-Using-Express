var adManage = function() {};
var databaseUrl = "mongodb://localhost:27017/PropertyHub";

adManage.get = function(req, res) {

    if(req.body) {
        var collections = ['propertyList'];
        var db = require("mongojs").connect(databaseUrl, collections);
        var ads = [];

        db.propertyList.find({agent_id: req.query.agent_id}, function(err, prop) {
            if( err ) {
                //todo:
                return;
            }
            if(prop && prop.length) {
                for(var i = 0; i < prop.length; i++) {
                    var p = prop[i];
                    var address_line1 = p.unit_number + ", " + p.street_1;
                    if(p.street_2)
                        address_line1 = address_line1 +", "+p.street_2;
                    address_line2 = p.city + ", " + p.state + " " + p.zip;
                    ads.push({
                        id: p.id,
                        name: p.name,
                        city: p.city,
                        address: [ address_line1, address_line2 ],
                        price: p.price,
                        contract_type: p.contract_type,
                        agent_id: p.agent_id,
                        status: p.status ? p.status : 'Available'
                    });
                }

                res.render('adManage', {
                    firstname: req.query.firstname,
                    email: req.query.agent_id,
                    posted_ads: ads
                });
            }
            else {
                res.render('profile_home', {firstname: req.query.firstname,
                                role: "Agent",
                                greeting: "No Ads were posted. Please post an ad",
                                primary_function: "Post Ad",
                                agent_id: req.query.agent_id,
                                link: "/adPost?agent_id="+req.query.agent_id});
            }
        });
    }
};

module.exports = adManage;