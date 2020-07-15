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

    let aggregateDbs = (config = {}) => {
        let { from, local, foreign, as, } = config;
        return db.aggregate([{
                $lookup: {
                    from: from,
                    localField: local,
                    foreignField: foreign,
                    as: as
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [{
                            $arrayElement: [`$${as}`, 0]
                        }, "$$ROOT"]
                    }
                }
            },

            {
                $project: {
                    fromItems: 0
                }
            }
        ]);
    }

    return Object.freeze({
        insertOne,
        findByKeys,
        findOne,
        aggregateDbs
    });
};

module.exports = Db;