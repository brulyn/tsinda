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