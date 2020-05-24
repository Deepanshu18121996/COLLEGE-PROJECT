const moongose = require('mongoose');
const schema = moongose.Schema;

const sell_account = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
    ref: 'user_account',
  },
});

module.exports = moongose.model('sell_account', sell_account);
