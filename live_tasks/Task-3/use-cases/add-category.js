module.exports = function makeAddCategroyUseCase({
    getAllCategories,
    addCategoryInBigCommerce
}){
    return async function addCategory(obj) {
        console.info(`Inside add category use case`);
        
        const splitName = obj['Category'].split(';');
        
        for(let i = 0;i < splitName.length; i++){
            const categoryArr = splitName[i].split('|');
            
            let b;

            for(let i = 0;i<categoryArr.length ; i++){
                let PathAndName = categoryArr[i].split(",");
                
                let a = '3/4in. Offset Pivot';
                let d = '1-1/2in. Offset Pivot';
                const getAllCategoryResult = await getAllCategories();
                const CategoryData = getAllCategoryResult.data;
                let categoryPath;
                for(let i = 0;i < PathAndName.length ; i++){
                if (PathAndName[i].includes(a) || PathAndName[i].includes(d) ){
                    categoryPath = [PathAndName[1]];
                }
                else{
                    categoryPath = PathAndName[1].split("/");
                }
            }
                
                let categoryExist;
                let onlyName;
                let nameArray;
                let parentId;
                
                for(let obj of CategoryData){

                    categoryExist = 0;
                    onlyName = categoryPath[0].split(':');
                    let c = '3/4in. Offset Pivot';
                    let d = '1-1/2in. Offset Pivot';
                    if(onlyName[1].includes(c)){
                        const filteredArray = onlyName[1].split('/').map((item) => item.trim());
                        filteredArray[1] = filteredArray[2].replace('', '3/');
                        nameArray = filteredArray.filter((item, index) => index !== 2);
                    }
                    else if(onlyName[1].includes(d)){
                        const filteredArray = onlyName[1].split('/').map((item) => item.trim());
                        filteredArray[1] = filteredArray[2].replace('', '1-1/');
                        nameArray = filteredArray.filter((item, index) => index !== 2);
                    }
                    else{
                    nameArray = onlyName[1].split("/");
                    }
                    
                    let finalNameArray = [nameArray[0]];
                    let[,...a] = categoryPath;
                    b = [...nameArray , ...a];
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
        const getAllCategoryResult = await getAllCategories();
        for(let i = 1; i < b.length; i++){
            let flag = 0;
            let bottom = 0;
            let parentid;
            let ExistCategory = [b[0]];
            for(let obj of getAllCategoryResult.data){

                    if(obj.name === b[i].trim()){
                    if(b[i].trim() !== "Bottom"){
                    ExistCategory.push(obj.name);
                    
                    flag = 1;
                    break;
                }
                else if(b[i].trim() === "Bottom"){
                    bottom++;
                    if(bottom > 1){
                        if(b[i-1] ==='1-1/2in. Offset Pivot'){
                            flag = 0;
                        }
                    else{
                        flag = 1;
                    }
                    }
                }
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