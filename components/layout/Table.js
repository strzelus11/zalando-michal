import { CartContext } from "@/hooks/CartContext";
import { useContext } from "react";

export default function Table({ cartProducts, products }) {
	const { removeProduct, addProduct, clearCart } = useContext(CartContext);

	let total = 0;
	for (const productId of cartProducts) {
		const price =
			products.find((product) => product.id === productId)?.price || 0;
		total += price;
    }
    
    return (
        <table>
            
        </table>
    )
}
