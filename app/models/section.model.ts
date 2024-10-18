import { Schema, model, models } from "mongoose";

const SectionSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	uid: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	updated_at: {
		type: Date,
		default: Date.now,
	},
});

const Section = models?.Section || model("Section", SectionSchema);

export default Section;
