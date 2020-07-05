const Db = (db) => {
    let insertOne = (dataObj) => {
        let data = new db(dataObj);
        return data.save()
            .then(dbObj => {
                return dbObj.toObject();
            })
            .catch(err => Promise.reject(err));
    };
    let findByKeys = (query = [], requirements = {}) => {
        query = {
            $or: query
        };
        return db.findOne(query, requirements)
            .then(user => user)
            .catch(err => Promise.reject(err));

    }

    let findOne = (query = {}, requirements = {}) => {
        return db.findOne(query, requirements)
            .then(user => user)
            .catch(err => Promise.reject(err));
    }

    return Object.freeze({
        insertOne,
        findByKeys,
        findOne
    });
};

module.exports = Db;