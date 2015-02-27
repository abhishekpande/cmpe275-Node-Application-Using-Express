var login = function() {};

login.get = function(req, res) {
    console.log("Rendering login page");

};

login.post = function(req, res) {
    console.log(req.body);
}

module.exports = login;