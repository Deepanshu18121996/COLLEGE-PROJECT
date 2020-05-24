const mongoose = require('mongoose');
const schema = mongoose.Schema;
const user_order = new schema({
  email: { type: String, required: true },
  name: { type: Array, required: true },
  image: { type: Array, required: true },
  price: { type: Array, required: true },
  quantity: { type: Array, required: true },
  localtotal: { type: Array, required: true },
  grandtotal: { type: String, required: true },
  subtotal: { type: String, required: true },
  gst: { type: String, required: true },
  status: { type: String, required: true },
  Created_at: { type: Date, default: Date.now() },
});
//order = table name/model name
module.exports = mongoose.model('order', user_order);
