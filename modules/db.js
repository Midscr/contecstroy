const connection = require('./connections');
const cache = {
      cities: null,
      deliveryAddresses: null
};

const queries = {
      cities: 'SELECT * FROM cities',
      deliveryAddresses: 'SELECT * FROM delivery'
}

async function query(sql) {
      return new Promise((resolve, reject) => {
            connection.query(sql, (err, data) => {
                  if (err) reject(err);
                  else resolve(data);
            });
      });
}

function makeQuery(queryType) {
      return async function () {
            if (cache[queryType]) return cache[queryType];
            try {
                  cache[queryType] = await query(queries[queryType]);
            } catch (e) {
                  connection.end();
                  throw new Error('database connection error:', e);
            }
            // connection.end();
            return cache[queryType];
      };
}

module.exports = {
      getCities: makeQuery('cities'),
      getDeliveryAddresses: makeQuery('deliveryAddresses')
};
