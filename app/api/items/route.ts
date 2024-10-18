import Item from "@/app/models/item.model";
import Section from "@/app/models/section.model";
import { connect } from "@/connect";

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "10mb",
		},
		responseLimit: "10mb",
	},
};
export async function GET(request: Request) {
	await connect();
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("search");
	const items = await Item.find({
		name: { $regex: new RegExp(query ?? "", "i") },
	}).sort({ createdAt: 1 });

	return Response.json({ items });
}

export async function POST(request: Request) {
	await connect();
	const { name, uid, sectionId } = await request.json();

	try {
		// Find or create the section
		let section = await Section.findOne({ id: sectionId });
		if (!section) {
			section = await Section.create({ id: sectionId });
		}

		const item = await Item.create({
			name,
			uid,
			section: section._id, // Reference the section by ID
		});
		if (item) {
			return Response.json(item);
		} else {
			return Response.json({ error: "Couldn't create Item" }, { status: 500 });
		}
	} catch (error) {
		return Response.json({ error: "Invalid request body" }, { status: 400 });
	}
}
export async function DELETE(request: Request) {
	await connect();
	const body = await request.json();
	if (!body.ids || !Array.isArray(body.ids)) {
		return Response.json({ error: "Invalid IDs provided", status: 400 });
	}

	const deletedCount = await Item.deleteMany({ _id: { $in: body.ids } });

	if (deletedCount.deletedCount === 0) {
		return Response.json({ error: "No items found to delete", status: 404 });
	}

	return Response.json({ success: true, deletedCount });
}
