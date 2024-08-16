import mongoose from "mongoose";

const blogSchema = new mongoose.Schema ({
    image: { type: String, required: true},
    title: { type: String, required: true},
    description: { type: String, required: true}
})

const blogModel = mongoose.model('blogs', blogSchema);
export default blogModel