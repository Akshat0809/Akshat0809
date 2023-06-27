// console.log("rest -services")
const express = require('express')
const controllers = require('./controllers')
const router = express.Router();
function init(){
    initUserRoutes();
    initFolderRoutes();
    initauth();
}
 
function initUserRoutes() { 
    router.get('/users',controllers.userControllers.createShowUserController);

    router.post('/users',controllers.userControllers.createCreateuserController);

    router.put('/users/:id',controllers.userControllers.createUpdateuserController);

    router.get('/users/:id',controllers.userControllers.createGetuserByIdController);
    
    router.delete('/users/:id',controllers.userControllers.createDeleteuserController);
} 

function initFolderRoutes(){
    router.post('/folder',controllers.folderControllers.createCreatefolderController);

    router.put('/folder/:id',controllers.folderControllers.createUpdatefolderController);

    router.delete('/folder/:id',controllers.folderControllers.createDeletefolderController);
    
    router.get('/folder/:id',controllers.folderControllers.createGetfolderByIdController);
}
function initauth() {

    router.get("/auth/google", controllers.authAction.googleAuthLogin);
    router.get("/auth/google/callback", controllers.authAction.googleAuthCallback);
    
    }
init();
module.exports = router;