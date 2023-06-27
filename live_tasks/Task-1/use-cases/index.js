console.log("inside index.js of use-case");
const xlsx = require('xlsx');
const dataAccess = require('../data-access/index')


const makeCreateVariant = require('./create-variant');
const createVariants = makeCreateVariant({

})

const makegetoptionsUseCase = require('./get-options');
const getoptions = makegetoptionsUseCase({

})

const makeproductoption = require('./add-options');
const addProductoption = makeproductoption({
    createVariants,
    getoptions
})

const makeCustomfieldUseCase = require('./custom-field');
const Createcustomfield = makeCustomfieldUseCase({

})

const makeAddproductUseCase = require('./add-product');
const addproduct = makeAddproductUseCase({
    addProductoption,
    createproducte: dataAccess.product.createproducte,
    Createcustomfield
})

const makeGroupOnBasisOfSKU = require('./group-by');
const addSortAdder = makeGroupOnBasisOfSKU({

})



const makegetfile = require('./get-data');
const getfiledata = makegetfile({
    xlsx,
    addproduct,
    addSortAdder,
})



module.exports = Object.freeze({
    getfiledata,
    addproduct,
    addProductoption,
    addSortAdder,
    createVariants,
    getoptions,
    Createcustomfield
})