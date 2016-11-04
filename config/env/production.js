module.exports = {
    //Development configuration options
    db: 'mongodb://admin:admin@ds143767.mlab.com:43767/tsinda',
    sessionSecret: 'developmentSessionSecret',
    facebook: {
        clientID: '597390973774147',
        clientSecret: 'ba964a455812afb6aa16355dfc28bb94',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    },
    twitter: {
        clientID: '0dIQk2MmTibxz4rfg9XeKCUMV',
        clientSecret: 'xrKtEYrA9nD8asPx2wdQMHHv0B4BKxo1Y3BQZxQ503t0p9XZvt',
        callbackURL: 'http://localhost:3000/oauth/twitter/callback'
    },
    google: {
        clientID: '578665604715-m4mhcl3msccjlhc9eabhovgvqpov022g.apps.googleusercontent.com',
        clientSecret: 'UgIq5y85nDdyIAsIhW3V8bAd',
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    }
};