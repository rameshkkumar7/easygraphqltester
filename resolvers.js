const db = require('./db')
const Query = {
    /*  operations: (operationId, page, pageSize) => {
         data: {
             id
             name
             serviceId
             accountId
             customerId
             status
             createdDate
         }

     } */
    operations: (root, args, context, info) => {
        //args will contain parameter passed in query
        return db.operations.get(args.id);
    }
};

module.exports = { Query }