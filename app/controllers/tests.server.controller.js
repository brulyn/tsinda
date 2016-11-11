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
            var message = "";
            for(var i=0; i<submited_answers.length;i++){
                total++;
                if(saved_answers[i] === submited_answers[i]){
                    marks++;
                }
                else{
                    message += "Answer"+i+" should be "+saved_answers[i]+"\nYour answer was "+submited_answers[i]+"\n\n";
                }
            }
            res.send("You got "+ ((marks/total)*100).toFixed(2) +" out of "+total +"\n\n"+message);
        }
    )
};