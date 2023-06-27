const {Given, When, Then, After} = require('cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makeDeleteUserUseCase = require('./delete-user');
const { json } = require('body-parser');

const sandbox = sinon.createSandbox();

const usersDb = {
 deleteUser: () => {
  },
};


const deleteStub = sandbox.stub(usersDb, 'deleteUser');
deleteStub.callsFake((args) => {
  expect(args).deep.equal({
    id: this.id,
  });

  return { "id": 1};
});

After(() => {
  this.id = undefined;

  sandbox.resetHistory();
});
// User details id: "<id>" to delete Exisitng user
Given(`User details id: {string} to delete Existing user`,
    (id) => {
 
      this.id = id || undefined;
 
    },
);

When('Try to delete Existing user', async () => {
  const deleteUser = makeDeleteUserUseCase({
    Joi,
    usersDb,
  });

  try {
    this.result = await deleteUser({
      id: this.id,
    });
  } catch (e) {
    console.log(e)
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then('It will throw error: {string} with message: "{string}" while delete user', (error, message) => {
  expect(this.error).deep.equal({
    name: error,
    message,
  });
});


Then('It will delete Existing user with details: {string}', (deleteUserDetails) => {
  expect(this.result).deep.equal(JSON.parse(deleteUserDetails));
});


Then('deleteUser function will call {int} time while delete Exisitng user',
    (deleteUserFunctionCallCount) => {
      sinon.assert.callCount(deleteStub, deleteUserFunctionCallCount);
    },
);
