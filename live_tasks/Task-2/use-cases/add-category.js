module.exports = function makeAddCategroyUseCase({
    getAllCategories,
    addCategoryInBigCommerce
}){
    return async function addCategory(obj) {
        console.info(`Inside add category use case`);
        console.log('oobbjj',obj['Product Name']);
        const splitName = obj['Category'].split(';');
        //
        console.log('splitname',splitName);
        for(let i = 0;i < splitName.length; i++){
            const categoryArr = splitName[i].split('|');
            //
            console.log(categoryArr);
            let b;

            for(let i = 0;i<categoryArr.length ; i++){
                let PathAndName = categoryArr[i].split(",");
                //
                console.log("PathAndName",PathAndName);
                const getAllCategoryResult = await getAllCategories();
                const CategoryData = getAllCategoryResult.data;
                const categoryPath = PathAndName[1].split("/");
                //
                console.log("category",categoryPath);
                let categoryExist;
                let onlyName;
                let nameArray;
                let parentId;
                
                for(let obj of CategoryData){

                    categoryExist = 0;
                    onlyName = categoryPath[0].split(':');
                    //
                    console.log("onlyName",onlyName);
                    nameArray = onlyName[1].split("/");
                    //
                    console.log('nameArray',nameArray);
                    let finalNameArray = [nameArray[0]];
                    let[,...a] = categoryPath;
                    b = [...nameArray , ...a];
                    //
                    console.log('a',a);
                    console.log('b',b);
                    if(obj.name === nameArray[0].trim()){
                        categoryExist = 1;
                        parentId = obj.category_id;
                        break;
                    }
                }

                if(categoryExist === 1){
                    const createChildCategoryResult = await createChildCategory({
                        b,
                        parentId
                    });
                }
                else{
                    let body = {
                        parent_id: 0,
                        name : nameArray[0].trim(),
                    };
                    await addCategoryInBigCommerce({ body });
                }
            }

            
        }
    };
    
    async function createChildCategory({ b }){
        const trimmedArray = b.map((str) => str.replace (/\s+/g, " ").trim());
        //
        console.log("trimmedArray",trimmedArray);
        const getAllCategoryResult = await getAllCategories();

        for(let i = 1; i < b.length; i++){
            let flag = 0;
            let parentid;
            let ExistCategory = [b[0]];

            for(let obj of getAllCategoryResult.data){
                if(obj.name === b[i].trim()){
                    ExistCategory.push(obj.name);

                    flag = 1;
                    break;
                }
            }

            for(let obj of getAllCategoryResult.data){
                if(trimmedArray.includes(obj.name)){
                    parentid = obj.category_id;
                }
            }

            if(flag === 0){
                let body = {
                    parent_id: parentid,
                    name: b[i].trim(),
                };
                await addCategoryInBigCommerce({ body });
            }
        }
    }

};