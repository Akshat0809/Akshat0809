const objectNodesOfTree = [
    { _id: '0',
     tag: `akshat`,
      parent_id: null,
       domain_id: 'tree',
        description: 'good to know you are here to get the description' 
    }];
     const treeLevels = []; 
     treeLevels[0] =  treeLevels[1] = prompt('Enter the number First level child node')
      treeLevels[2] = prompt('Enter the number Second level child node')
       treeLevels[3] = prompt('Enter the number Second level child node')
        treeLevels[4] = prompt('Enter the number Second level child node') 
        let max = treeLevels[0]; for (let i in treeLevels)
         {
             for (let j = 0; j < treeLevels[i]; j++) {
                 objectNodesOfTree.push({ _id: i + j, tag: 'tag', parent_id: (i == 0) ? '0' : `${i - 1}${Math.floor(Math.random() * 10) % treeLevels[i - 1]}`, domain_id: 'tree', description: 'discription'
                 });
                 }
        }
                  console.log(objectNodesOfTree);                     