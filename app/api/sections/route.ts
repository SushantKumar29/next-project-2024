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
	try {
		const { searchParams } = new URL(request.url);
		const query = searchParams.get("search");

		// Perform aggregation to join sections with their items
		const sections = await Section.aggregate([
			{
				$match: {
					name: { $regex: new RegExp(query ?? "", "i") }, // Filter sections based on the query
				},
			},
			{
				$lookup: {
					from: "items", // The collection name for items (should match your MongoDB collection name)
					localField: "_id", // Field from the sections collection
					foreignField: "section", // Field from the items collection (the field that references the section)
					as: "items", // The name of the field to add the matched items
				},
			},
			{
				$sort: { createdAt: 1 }, // Sort the sections by createdAt
			},
		]);

		return Response.json({ sections });
	} catch (error) {
		return Response.json({ error: "Invalid request body" }, { status: 400 });
	}
}

export async function POST(request: Request) {
	await connect();
	try {
		const body = await request.json();
		const section = await Section.create(body);
		return Response.json(section);
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

	const deletedCount = await Section.deleteMany({ _id: { $in: body.ids } });

	if (deletedCount.deletedCount === 0) {
		return Response.json({ error: "No sections found to delete", status: 404 });
	}

	return Response.json({ success: true, deletedCount });
}
