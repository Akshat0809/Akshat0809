module.exports = function makeGroupOnBasisOfSKU() {

return async function addSortAdder(result1 ) {
    const arr = result1.reduce(function (r, a) {
    r[a['Primary SKU']] = r[a['Primary SKU']] || [];
    r[a['Primary SKU']].push(a);
    return r;
},
Object.create(null));
         return arr;
}
    }