const chai = require('chai');
const ErrorsHandler = require('../index');

let expect = chai.expect;
let assert = chai.assert;
let should = chai.should();

describe("Test ErrorsHandlerModule", () => {

    // TODO: create sandbox and test acc to run tests of module
    it("Simple test (check bugsnag)", () => {
        const message = 'Simple test passed';

        // TODO: expect.to.throw
        try {
            ErrorsHandler.throwAndBugsnagError(message);
        } catch(error) {
            assert.equal(error.message, message);
        }
    });

    it("throwAndBugsnagException() (check bugsnag)", () => {
        const message = 'throwAndBugsnagException()';

        try {
            //ErrorsHandler.throwAndBugsnagException(message, 400, 'BAD_REQUEST');
        } catch(error) {
            //TODO: handle
        }
    });

    //TODO: test all methods
    it("Test throwAndBugsnagError() (check new error in bugsnag)", () => {
        const message = 'test throwAndBugsnag()';

        try {
            ErrorsHandler
                .setSubsystemName('subsystem name TESTED')
                .setSeverity('warning')
                .throwAndBugsnagError(message, {
                    //name: 'Test subsystem name',
                    customField: 'custom value'
                });
        } catch (error) {
            assert.equal(error.message, message);
        }
    });

    it("Test bugsnagError() (check new error in bugsnag)", () => {
        const message = 'test sending error to bugsnag without throwing';

        ErrorsHandler
            .bugsnagError(message, {
                //name: 'Test subsystem name',
                customField: 'custom value'
            });
    });
});




