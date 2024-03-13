"use client";



import { useEffect, useState } from "react";
import Link from 'next/link';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://world.openfoodfacts.org/api/v2/search?page_size=20&page=${page}`);
      const data = await response.json();
      console.log("Data:", data);
      setProducts(data.products);
    };

    fetchProducts();
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-wrap justify-stretch items-center m-8">
        {products.map((product, index) => (
          <div key={index} className="flex flex-col border p-4 m-2 w-64">
            <h2 className="text-xl font-bold mb-2">{product.product_name}</h2>
            <Link href={`/product/${product.id}`}>
                <img src={product.image_thumb_url} alt={product.product_name} className="w-full h-64 object-cover mb-2" />
            </Link>
            <p className="text-sm text-gray-500">{product.brands}</p>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <button onClick={prevPage} disabled={page === 1} className="mr-4">←</button>
        <button onClick={nextPage} className="ml-4">→</button>
      </div>
    </div>
  );
};

export default Home;