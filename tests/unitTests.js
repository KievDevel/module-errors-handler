const chai = require('chai');
const ErrorsHandler = require('../index');
const ErrorsHandlerModule = require('../ErrorsHandlerModule');
const { BUGSNAG_KEY, APP_VERSION, APP_TYPE, VALID_SEVERITY_TYPES } = require('../config');

let expect = chai.expect;
let assert = chai.assert;
let should = chai.should();

/**
 * This tests are 'defence' from fools errors - if method changed - test will fail
 */
describe("Test module methods", () => {

    it("is singleton", () => {
        expect(ErrorsHandler).to.be.an.instanceof(ErrorsHandlerModule);
    });

    it("setting correct release stage", () => {
        //
    });

    it("setSeverity: validating severity", () => {
        const severity = VALID_SEVERITY_TYPES[1];
        const oldSeverity = ErrorsHandler.severity;

        ErrorsHandler.setSeverity(severity);

        assert.equal(severity, ErrorsHandler.severity);
    });

    it("setSeverity: not passing invalid severity", () => {
        const severity = 'invalid severity';
        const oldSeverity = ErrorsHandler.severity;

        ErrorsHandler.setSeverity(severity);

        assert.equal(oldSeverity, ErrorsHandler.severity);
    });
});




