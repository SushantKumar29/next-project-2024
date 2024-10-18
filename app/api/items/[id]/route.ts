import Item from "@/app/models/item.model";
import { connect } from "@/connect";

export async function GET(request: Request) {
	await connect();
	const url = new URL(request.url);
	const id = url.pathname.split("/").at(-1);
	if (!id) return Response.json({ error: "Invalid Item" }, { status: 400 });

	const item = await Item.findById(id);
	if (!item) return Response.json({ error: "Item not found" }, { status: 404 });

	return Response.json({ item });
}
