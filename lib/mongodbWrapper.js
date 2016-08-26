const MongoClient = require('mongodb').MongoClient;

function Wrapper(options) {
    let self = this;

    let isValid;
    let url, collections;
    let dbInstance;
    let onConnectedCallback;

    isValid = !!options && !!options.url && !!options.collections && Array.isArray(options.collections) && options.collections.length > 0;

    if (!isValid) throw new Error('invalid options');

    url = options.url;
    collections = options.collections;

    let deferred = Promise.defer();

    MongoClient.connect(url, (err, db) => {
        dbInstance = db;

        collections.forEach((collection) => {
            if (typeof collection === 'string') {
                self[collection] = dbInstance.collection(collection);
            }
        });

        deferred.promise.then(() => {
            onConnectedCallback();
        });
    });

    self.onConnected = (callback) => {
        onConnectedCallback = callback;
        deferred.resolve();
    };

    self.close = () => {
        if (dbInstance) dbInstance.close();
    };

}

module.exports = Wrapper;
