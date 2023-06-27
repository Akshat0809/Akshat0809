const {Given, When, Then, After} = require('cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makegetFolderByIdFolderUseCase = require('./get-folders-by-id');
const { json } = require('body-parser');

const sandbox = sinon.createSandbox();

const foldersDb = {
    getFolderById: () => {
  },
};


const getFolderByIdStub = sandbox.stub(foldersDb, 'getFolderById');
getFolderByIdStub.callsFake((args) => {
  expect(args).deep.equal({
    id: this.id,
  });

  return { "id": 1};
});

After(() => {
  this.id = undefined;

  sandbox.resetHistory();
});
// Folder details id: "<id>" to delete Exisitng Folder
Given(`folder details id: {string} to find folder with id`,
    (id) => {
 
      this.id = id || undefined;
 
    },
);

When('Try to find details', async () => {
  const getFolderById = makegetFolderByIdFolderUseCase({
    Joi,
    foldersDb,
  });

  try {
    this.result = await getFolderById({
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

Then('It will throw error: {string} with message: {string} while finding folder with id', (error, message) => {
  expect(this.error).deep.equal({
    name: error,
    message,
  });
});


Then('It will get folders with id: {string}', (getFolderByIdfolderDetails) => {
  expect(this.result).deep.equal(JSON.parse(getFolderByIdfolderDetails));
});


Then('getfolderById function will call {int} time while finding folder with id',
    (getfolderByIdFunctionCallCount) => {
      sinon.assert.callCount(getFolderByIdStub, getfolderByIdFunctionCallCount);
    },
);

