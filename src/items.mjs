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

const getItemById = (req, res) => {
    console.log('requested item by id', req.params.id);
    const itemFound = items.find(item => {
        return item.id == req.params.id;
    });
    const resJson = itemFound ? itemFound : {error: 'not found'};
    if (itemFound) {
        res.json(itemFound);
    } else {
        res.status(404  ).json({error: 'Item not found'});
    }
    res.json(resJson);
};

const postItem = (req, res) => {
    // Error if name property is missing
    //TEST {"name" : "Uusi item"}
    console.log("postItem: ",req.body);
    if (!req.body.name) {
        return res.status(400).json({error:"item name missing"});
    }
    //Creates new ID for the items array
    const newId = items[items.length-1].id + 1
    const newItem = {id: newId, name: req.body.name};
    items.push(newItem);
    res.status(201).json({message: 'item created'});
  };

const deleteItem = (req, res) => {
  const index = items.findIndex(item => item.id == req.params.id);
  if (index === -1) {
    // example how to send only the status code (still valid http response)
    return res.sendStatus(404);
    }
    const deletedItems = items.splice(index, 1);
    console.log('deleteItem:', deletedItems);
    res.json({deleted_item: deletedItems[0]});
    // or successful response without any content
    // res.sendStatus(204);
  };

const putItem = (req, res) => {
  // TODO: implement modify item
  const index = items.findIndex(item => item.id == req.params.id);
  if (index === -1) {
    return res.sendStatus(404);
  }
  // bad request
  if (!req.body.name) {
    return res.status(400).json({error: "item name missing"});
  }
  items[index].name = req.body.name;
  res.json({updated_item: items[index]});
  };

export{getItems, getItemById, postItem, putItem, deleteItem};
