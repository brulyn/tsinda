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
            var submited_answers = [];
            for(var i=0; i< test.answers.length; i++){
                saved_answers.push(test.answers[i]);
            }

            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    item = req.body[key];
                    submited_answers.push(item);
                }
            }
            var marks = 0;
            var total = 0;
            var messages = [];
            for(var i=1; i<=submited_answers.length;i++){
                total++;
                if(saved_answers[i] === submited_answers[i]){
                    marks++;
                }
                else{
                    var message = "Answer"+i+" should be "+saved_answers[i]+" \\n\\nYour answer was "+submited_answers[i];
                    messages.push(message);   
                }
            }
            res.render(
                'tests/58246ceedcba0f326cc6aa70',
                {
                    title: 'Tests',
                    user: req.user,
                    date: req.user.created.toDateString(),
                    img_url: (req.user.provider == 'facebook') ? req.user.providerData.picture.data.url :req.user.providerData.image.url,
                    messages: messages,
                    marks: marks
                }
            )
        }
    )
};