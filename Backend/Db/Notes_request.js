const mongoose = require("mongoose");
const schema = mongoose.Schema;
const notes_Req = new schema({
    email: { type: String, required: true },
    cat_name: { type: String, required: true },
    custom_cat: { type: String, required: true },
    note_name: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: String, required: true },
    created_at: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("notesreq", notes_Req);
