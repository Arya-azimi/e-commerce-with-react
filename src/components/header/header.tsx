import { Link } from "react-router-dom";
import { ShoppingCart } from "../shopping-cart";

function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          فروشگاه
        </Link>
        <nav className="space-x-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 transition-colors ml-4"
          >
            خانه
          </Link>
          <Link
            to="/products"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            محصولات
          </Link>
          <ShoppingCart />
        </nav>
      </div>
    </header>
  );
}

export { Header };
