console.log("inside index.js of use-case");
const xlsx = require('xlsx');
const dataAccess = require('../data-access/index')


const makesendemailUseCase = require('./sendmail')
const sendMail = makesendemailUseCase({

})

const makecsvfileUseCase = require('./read-data');
const createcsv = makecsvfileUseCase({
    sendMail
})

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

const makeGetAllCategoriesUseCase = require('./get-All-Categories');
const getAllCategories = makeGetAllCategoriesUseCase({

})

const makeCreateProductOption = require('./create-product-option');
const createProducts = makeCreateProductOption({
    getAllCategories
})

const makeCreateProduct =require('./create-product');
const createProduct = makeCreateProduct({
    getAllCategories
})



const makeAddCategoryInBigCommerceUseCase = require('./add-product-in-big-commerce');
const addCategoryInBigCommerce = makeAddCategoryInBigCommerceUseCase({

})

const makeAddCategroyUseCase = require("./add-category")
const addCategory = makeAddCategroyUseCase({
    getAllCategories,
    addCategoryInBigCommerce
})

const makeAddproductUseCase = require('./add-product');
const addproduct = makeAddproductUseCase({
    addProductoption,
    createproducte: dataAccess.product.createproducte,
    Createcustomfield,
    createProduct,
    createProducts,
    createcsv,
    addCategory,
})

const makeGroupOnBasisOfSKU = require('./group-by');
const addSortAdder = makeGroupOnBasisOfSKU({

})



const makegetfile = require('./get-data');
const getfiledata = makegetfile({
    xlsx,
    addproduct,
    addSortAdder,
    filedetails: dataAccess.product.filedetails,
})



module.exports = Object.freeze({
    getfiledata,
    addproduct,
    addProductoption,
    addSortAdder,
    createVariants,
    getoptions,
    Createcustomfield,
    createcsv,
    sendMail,
    createProducts,
    createProduct,
    addCategory,
    getAllCategories,
    addCategoryInBigCommerce
})