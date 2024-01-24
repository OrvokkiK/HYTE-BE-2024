// Mock data for simple API
const items = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
    {id: 3, name: 'Item kolme'},
    {id: 4, name: 'Item neljä'},
];

const getItems = (req, res) => {
    res.json(items);
};

export {getItems};

/* const getItemByID = (req, res) => {
    const requestedId = parseInt(req.params.id);

    // Find the item with the requested ID
    const item = items.find(item => item.id === requestedId);

    if (item) {
      console.log('Requested item:', item);
      res.json(item);
    } else {
      res.status(404).json({error: 'Item not found'});
    }
  }; */

const getItemById = (req, res) => {
    console.log('requested item by id', req.params.id);
    const itemFound = item.find(item => {
        return item.id == req.params.id;
    });
    const resJson = itemFound ? itemFound : {error: 'not found'};
    if (itemFound) {
        res.json(itemFound);
    } else {
        res.status(404).json({error: 'Item not found'});
    }
    res.json(resJson);
};

export {getItemById};

const postItem = (req, res) => {
    // TODO (vapaaehtonen, jatketaan tästä ens kerralla): lisää postattu
    // item items-taulukkoon
    res.json({message: 'item created'});
  };

export{postItem};

const deleteItem  = (req, res) => {
    res.json({message: 'delete placeholder'});
};

const putItem = (reg, res) => {
    res.json({message: 'put placeholder'});
};

export{deleteItem, putItem};
