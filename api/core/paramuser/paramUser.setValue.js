var queries = require('./paramUser.queries.js');
var shared = require('./paramUser.shared.js');
var setCacheValue = require('./paramUser.setCacheValue.js');
var Promise = require('bluebird');

module.exports = function(paramUser){
    
    // we test if the param already exist
    return gladys.utils.sql(queries.getValue, [paramUser.name, paramUser.user])
        .then(function(rows){
           
            // if value exist, we update it
            if(rows.length){
                
                return ParamUser.update({id: rows[0].id}, paramUser)
                  .then(function(paramUsers){
                     return paramUsers[0]; 
                  });
            } else {
                
                // if the value does not exist, we create it
                return ParamUser.create(paramUser);
            }
        })
        .then(function(paramUser){
            
           // we set the value of the cache
           setCacheValue(paramUser.name, paramUser.user, paramUser.value); 
           return paramUser;
        });
};