"use client";

import { ProductsCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const trendingProducts = async () => {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/search?sort_by=popularity&page_size=20&page=${page}&fields=brands,categories,image_url,product_name,nutriscore_grade,code`
      );
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };
  useEffect(() => {
    trendingProducts();
  }, [page]);

  return (
    <main className="w-full h-full">
      <section className="flex flex-col justify-center items-center">
        <div>
          <h2 className="text-4xl font-semibold">Produits Populaire</h2>
        </div>
        <div className="flex flex-wrap justify-center lg:px-28">
          {products.map((product) => (
            <div className="w-[calc(25%-1rem)] p-2" key={product.code}>
              <ProductsCard product={product} />
            </div>
          ))}
        </div>
        <div className="flex gap-3 py-4">
          <Button variant="outline" size="lg" onClick={handlePrevPage}>
            Page précédente
          </Button>
          <Button variant="outline" size="lg" onClick={handleNextPage}>
            Page suivante
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Home;
