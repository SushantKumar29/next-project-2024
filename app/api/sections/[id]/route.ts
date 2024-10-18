import Item from "@/app/models/item.model";
import Section from "@/app/models/section.model";
import { connect } from "@/connect";

export async function GET(request: Request) {
	await connect();
	const url = new URL(request.url);
	const id = url.pathname.split("/").at(-1);

	if (!id) return Response.json({ error: "Invalid Section" }, { status: 400 });

	const section = await Section.findById(id);
	if (!section)
		return Response.json({ error: "Section not found" }, { status: 404 });

	const items = await Item.find({ section: id }).sort({ createdAt: 1 });
	if (!items)
		return Response.json({ error: "Items not found" }, { status: 404 });

	return Response.json({ section, items });
}
