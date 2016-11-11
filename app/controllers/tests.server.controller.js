var Tests = require('mongoose').model('Test'),
    Users = require('mongoose').model('User');

exports.render = function (req, res) {
    if (req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }
    

   if (req.isAuthenticated()) {
        res.render(
            'tests', {
                title: 'Tests',
                user: req.user,
                date: req.user.created.toDateString(),
                img_url: (req.user.provider == 'facebook') ? req.user.providerData.picture.data.url :req.user.providerData.image.url
            }
        );
    } else {
        res.render(

            'login', {
                title: 'Sign-in Form',
                layout: false
            }
        );
    }
};

exports.renderTest = function (req, res) {
    /*
    if (req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }
    */
    

   if (req.isAuthenticated()) {
        res.render(
            'tests/'+req.params.id, {
                title: 'Tests',
                user: req.user,
                date: req.user.created.toDateString(),
                img_url: (req.user.provider == 'facebook') ? req.user.providerData.picture.data.url :req.user.providerData.image.url
            }
        );
    } else {
        res.render(

            'login', {
                title: 'Sign-in Form',
                layout: false
            }
        );
    }
};

exports.renderResults = function(req, res){

    Tests.findOne({_id: req.params.id},
        function(err, test){
            var saved_answers = [];
            for(var i=0; i< test.length; i++){
                saved_answers = test.answer`i`;
            }
            res.send(saved_answers);
        }
    )

};