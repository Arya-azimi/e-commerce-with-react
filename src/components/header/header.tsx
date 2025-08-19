import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "../shopping-cart";
import { useAuth } from "../../hooks";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          فروشگاه
        </Link>
        <nav className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-gray-600 ml-4 hover:text-gray-900 transition-colors"
          >
            خانه
          </Link>
          <Link
            to="/products"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            محصولات
          </Link>
          {user ? (
            <>
              <span className="text-gray-600">Hi, {user.username}</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                خروج
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ورود
            </Link>
          )}
          <ShoppingCart />
        </nav>
      </div>
    </header>
  );
}

export { Header };
