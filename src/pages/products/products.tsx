import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../hooks/";
import { Card } from "../../components";
import { Header } from "../../components/";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const sortOption = searchParams.get("sort") || "newest";

  const { products, loading, error } = useProducts();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      prev.set("search", e.target.value);
      return prev;
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((prev) => {
      prev.set("sort", e.target.value);
      return prev;
    });
  };

  const sortedAndFilteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortOption === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      if (sortOption === "price-asc") {
        return a.price - b.price;
      }
      if (sortOption === "price-desc") {
        return b.price - a.price;
      }
      return 0;
    });

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-1/2 p-2 border rounded-md"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select
            className="mt-4 md:mt-0 md:ml-4 p-2 border rounded-md"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedAndFilteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export { Products };
