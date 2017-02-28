module.exports = {
    //Development configuration options
    db: 'mongodb://admin:admin@ds143767.mlab.com:43767/tsinda',
    sessionSecret: 'developmentSessionSecret',
    facebook: {
        clientID: '597390973774147',
        clientSecret: 'ba964a455812afb6aa16355dfc28bb94',
        callbackURL: 'https://tsindapl.herokuapp.com/oauth/facebook/callback'
    },
    twitter: {
        clientID: '0dIQk2MmTibxz4rfg9XeKCUMV',
        clientSecret: 'xrKtEYrA9nD8asPx2wdQMHHv0B4BKxo1Y3BQZxQ503t0p9XZvt',
        callbackURL: 'https://tsindapl.herokuapp.com/oauth/twitter/callback'
    },
    google: {
        clientID: '233128968140-ek747mssubdjaito1nrsk03jl4imou7r.apps.googleusercontent.com',
        clientSecret: 'WrKiBpu3KcmClKRU3DWwz5NU',
        callbackURL: 'https://tsindapl.herokuapp.com/oauth/google/callback'
    }
};