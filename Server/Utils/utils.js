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
            .then(obj => obj)
            .catch(err => Promise.reject(err));

    }

    let findOne = (query = {}, requirements = {}) => {
        return db.findOne(query, requirements)
            .then(obj => obj)
            .catch(err => Promise.reject(err));
    }
    let findData = (query = {}, requirements = {}) => {
        return db.find(query, requirements)
            .then(dataList => dataList)
            .catch(err => Promise.reject(err));
    }

    let updateData = (query = {}, update = {}) => {
        return db.findOneAndUpdate(query, update, {
                new: true,
                useFindAndModify: false
            })
            .then(updateObj => updateObj)
            .catch(err => Promise.reject(err));
    }

    /* let aggregateDbs = (config = {}) => {
         let { from, local, foreign, as, } = config;
         return db.aggregate([{
             $lookup: {
                 from: from,
                 localField: local,
                 foreignField: foreign,
                 as: as
             }
         }]);
     }*/

    return Object.freeze({
        insertOne,
        findByKeys,
        findOne,
        //aggregateDbs,
        findData,
        updateData
    });
};

module.exports = Db;