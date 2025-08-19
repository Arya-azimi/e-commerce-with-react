import { Product } from "../../types";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: Product;
};

function Card({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="block overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-xl"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="mt-1 text-gray-600">
          {product.price.toFixed(2)} هزار تومان
        </p>
      </div>
    </Link>
  );
}

export { Card };
