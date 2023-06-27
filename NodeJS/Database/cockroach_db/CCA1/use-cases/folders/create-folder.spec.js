const {Given, When, Then, After} = require('cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makegetcreateFolderUseCase = require('./create-folder');
const { json } = require('body-parser');

const sandbox = sinon.createSandbox();

const foldersDb = {
 createFolder: () => {
  },
};


const createfolderStub = sandbox.stub(foldersDb, 'createFolder');
createfolderStub.callsFake((args) => {
  expect(args).deep.equal({
    name: this.name,
    id: this.id,
  });

  return {"id": 1};
});

After(() => {
  this.id = undefined;
  this.name = undefined;
  sandbox.resetHistory();
});

Given(`User details id: {string} and name: {string} to create new folder`,
    (id,name) => {
 
      this.id = id || undefined;
      this.name = name || undefined;
      // this.id = parseInt(id) || undefined;
    },
);


When('Try to create new folder', async () => {
  const createFolder = makegetcreateFolderUseCase({
    Joi,
    foldersDb,
  });

  try {
    this.result = await createFolder({
      id: this.id,
      name:this.name,
    });
  } catch (e) {
    console.log(e)
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then('It will throw error: {string} with message: "{string}" while creating new folder', (error, message) => {
  expect(this.error).deep.equal({
    name: error,
    message,
  });
});

Then('It will create new folder with details: "{string}"', (createFolderDetails) => {
  // console.log(1);
  expect(this.result).deep.equal(JSON.parse(createFolderDetails));
});

Then('createFolder function will call {int} time while creating new folder',
    (createFolderFunctionCallCount) => {
      sinon.assert.callCount(createfolderStub, createFolderFunctionCallCount);
    },
);
