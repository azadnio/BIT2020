
let categories = [];
for(let i = 1; i < 11 ; i++)
      categories.push({
            id: i,
            name: 'Category 1'
      })


export { categories }

let brands = [];
for(let i = 1; i < 11 ; i++)
      brands.push({
            id: i,
            name: 'Brand 1'
      })


export { brands }

let items = [];

for(let i = 1; i < 1000; i++)
      items.push({
            id: i,
            categoryId: i % 10,
            brandId: i,
            title: 'Shangai Door Lock ' + i,
            description: 'china made high quality door locks ' +i ,
            moreInfo: 'this is something more onfo adsvsvdvavf a dfa aff adf fd d d df f afuhiadfhv uavhufb ' + i,
            price:1000 + i,
            imageUrls:['assets/items/doorhandle.jpg', 'assests/items/doorhandle2.jpg']
      });


export { items };

