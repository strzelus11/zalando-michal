import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
	await mongooseConnect();

	const { q } = req.query;

	if (req.method === "GET" && q) {
		const query = new RegExp(q, "i");
		const products = await Product.find({ title: query });
		res.status(200).json(products);
	} else {
		res.status(400).json({ message: "Invalid search query" });
	}
}
