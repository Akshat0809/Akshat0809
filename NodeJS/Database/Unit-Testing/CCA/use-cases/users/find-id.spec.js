const {Given, When, Then, After} = require('cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makefindIdUseCase = require('./find-id');

const sandbox = sinon.createSandbox();

const usersDb = {
 findId: () => {
  },
};


const findIdStub = sandbox.stub(usersDb, 'findId');
findIdStub.callsFake((args) => {
  expect(args).deep.equal({
    email: this.email,
  });

  return {"id": 1};
});

After(() => {
  this.email = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(`User details email: {string} to find id`,
    (email) => {
 
      this.email = email || undefined;
 
    },
);


When('Try to find id', async () => {
  const findId = makefindIdUseCase({
    Joi,
    usersDb,
  });

  try {
    this.result = await findId({
      email: this.email,
    });
  } catch (e) {
    console.log(e)
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then('It will throw error: {string} with message: "{string}" while finding id', (error, message) => {
  expect(this.error).deep.equal({
    name: error,
    message,
  });
});

Then('It will find id with details: {string}', (newUserDetails) => {
  expect(this.result).deep.equal(JSON.parse(newUserDetails));
});

Then('findId function will call {int} time while finding id',
    (findIdFunctionCallCount) => {
      sinon.assert.callCount(findIdStub, findIdFunctionCallCount);
    },
);
