import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { Product } from "../types/";
import { useCartStore } from "../state/store";

export function useAddToCart() {
  const { user } = useAuth();
  const addItemToCart = useCartStore((state) => state.addItem);
  const navigate = useNavigate();

  const handleAddToCart = (product: Product, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }

    if (user) {
      addItemToCart(product);
      console.log(`${product.name} added to cart!`);
    } else {
      navigate("/login");
    }
  };

  return { handleAddToCart };
}
