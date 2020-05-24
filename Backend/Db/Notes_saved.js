const mongoose = require("mongoose");
const schema = mongoose.Schema;
const notes_Save = new schema({
    cat_name: { type: String, required: true },
    note_name: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: String, required: true },
    created_at: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("notes", notes_Save);