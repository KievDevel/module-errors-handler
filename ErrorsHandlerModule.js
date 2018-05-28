const bugsnag = require('bugsnag');
const { BUGSNAG_KEY, APP_VERSION, APP_TYPE, VALID_SEVERITY_TYPES } = require('./config');
const Exception = require('./Exception');

/**
 * Doc:
 * For adding middleware to handle express request call initForExpress
 *
 * TODO: check if errors have no duplicates (express+custom)
 */
class ErrorsHandlerModule {
    constructor() {
        this.bugsnag  = bugsnag;
        this.severity = 'error';
        this.releaseStage  = 'development';
        this.subsystemName = 'default subsystem name';

        this.initBugsnag();
    }

    initForExpress(app) {
        app.use(this.bugsnag.requestHandler);
        app.use(this.bugsnag.errorHandler);
    }

    initBugsnag() {
        this.setReleaseStage();

        this.bugsnag.register(BUGSNAG_KEY, {
            releaseStage: this.releaseStage,
            appType: APP_TYPE
        });

        this.bugsnag.onBeforeNotify((notification, originalError) => {

            let metaData = notification.events[0].metaData;

            metaData.app = {version: APP_VERSION};
        });
    }

    flushSettings() {
        // TODO: return settings to default
    }

    setSubsystemName(name) {
        this.subsystemName = name;

        return this;
    }

    setSeverity(severity) {
        if (VALID_SEVERITY_TYPES.includes(severity)) {
            this.severity = severity;
        }

        return this;
    }

    throwAndBugsnagError(message, payload) {
        const error = new Error(message);

        this.bugsnagError(message, payload);

        throw error;
    }

    throwAndBugsnagException(message, statusCode = 400, errorMessage = '') {
        const exception = new Exception(message, statusCode, errorMessage);

        this.bugsnagError(message, payload);

        throw exception;
    }

    bugsnagError(message, payload) {
        const error = new Error(message);

        let subsystemPayload = { name: this.subsystemName };
            subsystemPayload = payload ? Object.assign({ name: this.subsystemName }, payload) : subsystemPayload;

        this.bugsnag.notify(error, {
            severity: this.severity,
            subsystem: subsystemPayload
        });
    }

    // TODO: use in register method if needed
    getLoggerConfig() {
        return {
            info: function () {},
            warn: function () {},
            error: function () {}
        }
    }

    setReleaseStage() {
        this.releaseStage = process.env.NODE_ENV || this.releaseStage;
    }
}

module.exports = ErrorsHandlerModule;
