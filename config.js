// Setup node env to rewrite
module.exports = {
    BUGSNAG_KEY: process.env.EH_BUGSNAG_KEY || '',

    // TODO: app version get from package.json first
    APP_VERSION: process.env.EH_APP_VERSION || '0.1',
    APP_TYPE:    process.env.EH_APP_TYPE    || 'default-app-type',

    VALID_SEVERITY_TYPES: ['error', 'info', 'warning']
};