const {Given, When, Then, After} = require('cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makegetfolderExistsUseCase = require('./folder-exists');
const { json } = require('body-parser');

const sandbox = sinon.createSandbox();

const foldersDb = {
 folderExists: () => {
  },
};


const folderExistsStub = sandbox.stub(foldersDb, 'folderExists');
folderExistsStub.callsFake((args) => {
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

Given(`Folder details id: {string} and name: {string} to folder Exist`,
    (id,name) => {
 
      this.id = id || undefined;
      this.name = name || undefined;
      // this.id = parseInt(id) || undefined;
    },
);


When('Try to folder Exist', async () => {
  const folderExists = makegetfolderExistsUseCase({
    Joi,
    foldersDb,
  });

  try {
    this.result = await folderExists({
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

Then('It will throw error: {string} with message: "{string}" while finding folder existence', (error, message) => {
  expect(this.error).deep.equal({
    name: error,
    message,
  });
});

Then('It will folder Exist with details: "{string}"', (folderExistsDetails) => {
  // console.log(1);
  expect(this.result).deep.equal(JSON.parse(folderExistsDetails));
});

Then('folderExists function will call {int} time while creating new folder',
    (folderExistsFunctionCallCount) => {
      sinon.assert.callCount(folderExistsStub, folderExistsFunctionCallCount);
    },
);
