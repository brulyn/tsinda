module.exports = {
    //Development configuration options
    db: 'mongodb://admin:admin@ds143767.mlab.com:43767/tsinda',
    sessionSecret: 'developmentSessionSecret',
    facebook: {
        clientID: '597390973774147',
        clientSecret: 'ba964a455812afb6aa16355dfc28bb94',
        callbackURL: 'https://tsinda.herokuapp.com/oauth/facebook/callback'
    },
    twitter: {
        clientID: '0dIQk2MmTibxz4rfg9XeKCUMV',
        clientSecret: 'xrKtEYrA9nD8asPx2wdQMHHv0B4BKxo1Y3BQZxQ503t0p9XZvt',
        callbackURL: 'https://tsinda.herokuapp.com/oauth/twitter/callback'
    },
    google: {
        clientID: '713030075396-770egl80kfdev00hffoguvkpn90u6eld.apps.googleusercontent.com',
        clientSecret: 'RgTKwUzOP3h90yeIIOCRQ-mf',
        callbackURL: 'https://tsinda.herokuapp.com/oauth/google/callback'
    }
};