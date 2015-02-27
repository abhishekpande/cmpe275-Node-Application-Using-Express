
var register = function() {};

register.get = function(req, res) {
    console.log("Rendering register page");
    res.render('register', { title: 'Registration' });
};

register.post = function(req, res) {
    console.log(req.body);
    if(req.body) {
        var databaseUrl = "mongodb://localhost:27017/PropertyHub";
        var collections = ['buyerList', 'agentList'];
        var db = require("mongojs").connect(databaseUrl, collections);
        var userRole = req.body.userRole;
        var validUser = userRole && (userRole === "buyer" || userRole == "agent" );

        if(!validUser) {
            res.render('register_error', {errorText: "Invalid user role! Registration failed."});
            return;
        }

        if(userRole === "buyer") {
            db.buyerList.find({email: req.body.email}, function(err, buyer) {
                if( !buyer || buyer == ""  || !buyer.length ) {
                    console.log("No buyer found. So creating one ...");
                    db.buyerList.save(req.body, function(saveErr, saved) {
                        if( saveErr || !saved ) {
                            res.render('register_error', {errorText: "Some error occured"});
                        }
                        else {
                            res.render('profile_home',
                                {firstname: req.body.firstname,
                                 role: "Buyer",
                                 greeting: "Congratulations! You are successfully registered.",
                                 primary_function: "Search",
                                 agent_id: req.body.email,
                                 link: "/search?firstname="+req.body.firstname
                                });
                        }
                    });
                }
                else if( err ) {
                    res.render('register_error');
                    return;
                }
                else if( buyer || buyer.length ) {
                    res.render('register_present');
                    return;
                }
            });
        }
        else if(userRole === "agent") {
            db.agentList.find({email: req.body.email}, function(err, agent) {
                if( !agent || agent == ""  || !agent.length ) {
                    console.log("No agent found. So creating one ...");
                    db.agentList.save(req.body, function(saveErr, saved) {
                        if( saveErr || !saved ) {
                            res.render('register_error');
                        }
                        else {
                            res.render('profile_home',
                                {firstname: req.body.firstname,
                                 role: "Agent",
                                 greeting: "Congratulations! You are successfully registered.",
                                 primary_function: "Post Ad",
                                 agent_id: req.body.email,
                                 link: "/adPost?agent_id="+req.body.email
                                });
                        }
                    });
                }
                else if( err ) {
                    res.render('register_error');
                    return;
                }
                else if( agent || agent.length ) {
                    res.render('register_present');
                    return;
                }
            });
        }
    }
};

module.exports = register;
