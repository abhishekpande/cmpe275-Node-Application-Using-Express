var search = function() {};
var databaseUrl = "mongodb://localhost:27017/PropertyHub";

search.get = function(req, res) {
    res.render('search', {
        firstname: req.query.firstname
    });
};

search.post = function(req, res) {
    console.log(req.body);
    if(req.body) {
        var collections = ['propertyList'];
        var db = require("mongojs").connect(databaseUrl, collections);
        var property = {};
        var user_criteria = req.body, criteria = {};
        var results = [];
        if(!user_criteria)
            return;
        criteria.zip = user_criteria.zip;
        if(user_criteria.state !== 'default')
            criteria.state = user_criteria.state;
        if(user_criteria.city && user_criteria.city != '')
            criteria.city = user_criteria.city;
        if(user_criteria.name && user_criteria.name != '')
            criteria.name = user_criteria.name;
        if(user_criteria.street_1 && user_criteria.street_1 != '')
            criteria.street_1 = user_criteria.street_1;
        if(user_criteria.bedrooms && user_criteria.bedrooms != '')
            criteria.bedrooms = user_criteria.bedrooms;
        if(user_criteria.bathrooms && user_criteria.bathrooms != '')
            criteria.bathrooms = user_criteria.bathrooms;
        db.propertyList.find(criteria, function(err, prop) {
            if( err ) {
                //todo:
                return;
            }
            if(prop && prop.length) {
                console.log(prop);
                for(var i = 0; i < prop.length; i++) {
                    var p = prop[i];
                    var address_line1 = p.unit_number + ", " + p.street_1;
                    if(p.street_2)
                        address_line1 = address_line1 +", "+p.street_2;
                    address_line2 = p.city + ", " + p.state + " " + p.zip;
                    results.push({
                        id: p.id,
                        name: p.name,
                        city: p.city,
                        address: [ address_line1, address_line2 ],
                        price: p.price,
                        bedrooms: p.bedrooms,
                        bathrooms: p.bathrooms,
                        sqft: p.sqft,
                        property_type: p.property_type,
                        contract_type: p.contract_type
                    });
                }

                res.render('search_results', {firstname: req.body.firstname, search_results: results});
            }
            else {
                res.render('search_noresult', {backlink: '/search?firstname='+req.body.firstname});
            }
        });
    }
};

module.exports = search;