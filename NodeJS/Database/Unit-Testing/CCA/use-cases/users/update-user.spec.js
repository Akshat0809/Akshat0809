const {Given, When, Then, After} = require('cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makegetupdateUserUseCase = require('./update-user');
const { json } = require('body-parser');

const sandbox = sinon.createSandbox();

const usersDb = {
 updateUser: () => {
  },
};


const updateUserStub = sandbox.stub(usersDb, 'updateUser');
updateUserStub.callsFake((args) => {
  expect(args).deep.equal({
    id: this.id,
  });

  return 1;
});

After(() => {
  this.id = undefined;

  sandbox.resetHistory();
});

Given(`User details id: {string} to update user`,
    (id) => {
 
      this.id = id || undefined;
 
    },
);


When('Try to update user', async () => {
  const updateUser = makegetupdateUserUseCase({
    Joi,
    usersDb,
  });

  try {
    this.result = await updateUser({
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

Then('It will throw error: {string} with message: "{string}" while updating user', (error, message) => {
  expect(this.error).deep.equal({
    name: error,
    message,
  });
});

Then('It will update user with details: {int}', (updateUserDetails) => {
  // console.log(1);
  expect(this.result).deep.equal(JSON.parse(updateUserDetails));
});

Then('updateUser function will call {int} time while updating user',
    (updateUserFunctionCallCount) => {
      sinon.assert.callCount(updateUserStub, updateUserFunctionCallCount);
    },
);
