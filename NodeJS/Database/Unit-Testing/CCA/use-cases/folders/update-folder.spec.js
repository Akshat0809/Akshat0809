const {Given, When, Then, After} = require('cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makeupdateFolderFolderUseCase = require('./update-folder');
const { json } = require('body-parser');

const sandbox = sinon.createSandbox();

const foldersDb = {
    updateFolder: () => {
  },
};


const updateFolderStub = sandbox.stub(foldersDb, 'updateFolder');
updateFolderStub.callsFake((args) => {
  expect(args).deep.equal({
    id: this.id,
  });

  return { "id": 1};
});

After(() => {
  this.id = undefined;

  sandbox.resetHistory();
});

Given(`folder details id: {string} to update folder`,
    (id) => {
 
      this.id = id || undefined;
 
    },
);

When('Try to update folder', async () => {
  const updateFolder = makeupdateFolderFolderUseCase({
    Joi,
    foldersDb,
  });

  try {
    this.result = await updateFolder({
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

Then('It will throw error: {string} with message: "{string}" while updating folder', (error, message) => {
  expect(this.error).deep.equal({
    name: error,
    message,
  });
});


Then('It will update folder with details: {string}', (updatefolderDetails) => {
  expect(this.result).deep.equal(JSON.parse(updatefolderDetails));
});


Then('updatefolder function will call {int} time while updating folder',
    (updateFolderFunctionCallCount) => {
      sinon.assert.callCount(updateFolderStub, updateFolderFunctionCallCount);
    },
);

