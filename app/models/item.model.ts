import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
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
	section: {
		type: Schema.Types.ObjectId,
		ref: "Section",
		required: true,
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

const Item = models?.Item || model("Item", ItemSchema);

export default Item;
