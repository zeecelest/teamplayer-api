//keep track of the values 
//set sensible defaults if necessary
//defaults for the PORT value

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
};