const {Given, When, Then, After} = require('cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makeDefaultFolderUseCase = require('./default-folders');
const { json } = require('body-parser');

const sandbox = sinon.createSandbox();

const usersDb = {
 defaultFolders: () => {
  },
};


const defaultFoldersStub = sandbox.stub(usersDb, 'defaultFolders');
defaultFoldersStub.callsFake((args) => {
  expect(args).deep.equal({
    id: this.id,
  });

  return 1;
});

After(() => {
  this.id = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(`User details id: {string} to create default folder`,
    (id) => {
 
      this.id = id || undefined;
 
    },
);

When('Try to create default folder', async () => {
  const defaultFolders = makeDefaultFolderUseCase({
    Joi,
    usersDb,
  });

  try {
    this.result = await defaultFolders({
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

Then('It will throw error: {string} with message: "{string}" while creating default folders by id', (error, message) => {
  expect(this.error).deep.equal({
    name: error,
    message,
  });
});


Then('It will get folder with details: {int}', (result) => {
  expect(this.result).deep.equal(JSON.parse(result));
});


Then('defaultFolders function will call {int} time while creating default folders',
    (defaultFolderFunctionCallCount) => {
      sinon.assert.callCount(defaultFoldersStub, defaultFolderFunctionCallCount);
    },
);
