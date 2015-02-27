var home = function() {};

home.get = function(req, res) {
  res.render('index');
};

home.post = function(req, res) {
    console.log("POST: ");
    console.log(req.body);

    if(req.body) {
        var databaseUrl = "mongodb://localhost:27017/PropertyHub";
        var collections = ['buyerList', 'agentList'];
        var db = require("mongojs").connect(databaseUrl, collections);
        var userRole = req.body.userRole;
        var validUser = userRole && (userRole === "buyer" || userRole == "agent" );

        if(userRole === "buyer") {
            db.buyerList.find({email: req.body.email, pwd: req.body.pwd}, function(err, buyer) {
                if( !buyer || buyer == ""  || !buyer.length || err ) {
                    console.log("Buyer not found!");
                    res.render('login_error');
                }
                else if( buyer || buyer.length ) {
                    console.log("Login successful");
                    res.render('profile_home',
                               {firstname: buyer[0].firstname,
                                role: "Buyer",
                                greeting: "Welcome back",
                                primary_function: "Search",
                                agent_id: req.body.email,
                                link: "/search?firstname="+buyer[0].firstname});
                    return;
                }
            });
        }
        else if(userRole === "agent") {
            db.agentList.find({email: req.body.email, pwd: req.body.pwd}, function(err, agent) {
                if( !agent || agent == ""  || !agent.length || err ) {
                    console.log("Agent not found!");
                    res.render('login_error');
                }
                else if( agent || agent.length ) {
                    res.render('profile_home',
                               {firstname: agent[0].firstname,
                                role: "Agent",
                                greeting: "Welcome back",
                                primary_function: "Post Ad",
                                agent_id: req.body.email,
                                link: "/adPost?agent_id="+req.body.email});
                    return;
                }
            });
        }
    }
};

module.exports = home;
