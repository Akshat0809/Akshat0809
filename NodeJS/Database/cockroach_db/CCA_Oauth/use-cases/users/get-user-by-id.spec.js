const {Given, When, Then, After} = require('cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makegetUserByIdUseCase = require('./get-user-by-id');
const { json } = require('body-parser');

const sandbox = sinon.createSandbox();

const usersDb = {
 getUserById: () => {
  },
};


const findIdStub = sandbox.stub(usersDb, 'getUserById');
findIdStub.callsFake((args) => {
  expect(args).deep.equal({
    id: this.id,
  });

  return {"id": 1};
});

After(() => {
  this.id = undefined;

  sandbox.resetHistory();
});

Given(`User details id: {string} to find user with id`,
    (id) => {
 
      this.id = id || undefined;
      // this.id = parseInt(id) || undefined;
    },
);


When('Try to find Details', async () => {
  const getUserById = makegetUserByIdUseCase({
    Joi,
    usersDb,
  });

  try {
    this.result = await getUserById({
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

Then('It will throw error: {string} with message: "{string}" while finding user with id', (error, message) => {
  expect(this.error).deep.equal({
    name: error,
    message,
  });
});

Then('It will find Details with id: "{string}"', (getUserByIdDetails) => {
  // console.log(1);
  expect(this.result).deep.equal(JSON.parse(getUserByIdDetails));
});

Then('getUserById function will call {int} time while finding user with id',
    (getUserByIdFunctionCallCount) => {
      sinon.assert.callCount(findIdStub, getUserByIdFunctionCallCount);
    },
);
