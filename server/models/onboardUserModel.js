
const db = require('../../db/index.js').pool;

module.exports = {
  onboardUser: (data, callback, release) => {
    
    db.connect((err, client) => {
      if (err) {
        console.error(err); 
      } else {
        let text = 'SELECT * FROM users WHERE id_user = $1';
        let id = [data.email];

        client.query(text, id)
          .then(response => {
            release();
            if (response.rows.length !== 0) {

              if (id === response.rows[0].id_user) {
                // copy the response in order to delete sensitive information
                let reducedObject = {};
                reducedObject.id_user = response.rows[0].id_user;
                reducedObject.first_name = response.rows[0].first_name;
                reducedObject.last_name = response.rows[0].last_name;
                reducedObject.username = response.rows[0].username;
                reducedObject.email = response.rows[0].email;
                reducedObject.google_id = response.rows[0].google_id;
                reducedObject.facebook_id = response.rows[0].facebook_id;
                reducedObject.token = response.rows[0].token;
                reducedObject.token_timestamp = response.rows[0].token_timestamp;
                reducedObject.profile_image = response.rows[0].profile_image;

                callback(null, reducedObject); 
              }
            } 
          })
          .catch(err => {callback(err)});
      }
    });
  }
};