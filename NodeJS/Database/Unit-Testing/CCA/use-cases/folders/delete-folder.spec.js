const {Given, When, Then, After} = require('cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makeDeleteUserUseCase = require('./delete-folder');
const { json } = require('body-parser');

const sandbox = sinon.createSandbox();

const foldersDb = {
 deleteFolder: () => {
  },
};


const deleteStub = sandbox.stub(foldersDb, 'deleteFolder');
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
Given(`Folder details id: {string} to delete Existing Folder`,
    (id) => {
 
      this.id = id || undefined;
 
    },
);

When('Try to delete Existing Folder', async () => {
  const deleteFolder = makeDeleteUserUseCase({
    Joi,
    foldersDb,
  });

  try {
    this.result = await deleteFolder({
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

Then('It will throw error: {string} with message: "{string}" while delete Folder', (error, message) => {
  expect(this.error).deep.equal({
    name: error,
    message,
  });
});


Then('It will delete Existing folder with details: {string}', (deletefolderDetails) => {
  expect(this.result).deep.equal(JSON.parse(deletefolderDetails));
});


Then('deleteFolder function will call {int} time while delete Exisitng folder',
    (deleteFolderFunctionCallCount) => {
      sinon.assert.callCount(deleteStub, deleteFolderFunctionCallCount);
    },
);

