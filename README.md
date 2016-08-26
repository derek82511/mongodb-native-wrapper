# mongodb-native-wrapper
A lightweight wrapper which simplifies the node-mongodb-native module.

## Installation
```bash
$ npm install https://github.com/derek82511/mongodb-native-wrapper.git
```

## Usage
CRUD operations are inherited from node-mongodb-native module.

```js
const Wrapper = require('mongodb-native-wrapper').Wrapper;
const co = require('co');

const db = new Wrapper({
    url: 'mongodb://xxx:xxx@localhost:27017/xxx',
    collections: ['yourCollection1', 'yourCollection2']
});

db.onConnected(function() {
    console.log('MongoDB Connected');
    
    co(function*() {
        //find all doc in yourCollection1
        var docs = yield db.yourCollection1.find({}).toArray();
        console.log(docs);
        
        //insert a doc in yourCollection2
        var insertObj = { a: 1 };
        yield db.yourCollection2.insertOne(insertObj);
        console.log(insertObj);
        
        //update a doc in yourCollection2
        yield db.yourCollection2.updateOne({ a: 1 }, { $set: { b: 1 } });
        
        //delete a doc in yourCollection2
        yield db.yourCollection2.deleteOne({ a: 2 });
        
        //close connection
        db.close();
    });
});
```
