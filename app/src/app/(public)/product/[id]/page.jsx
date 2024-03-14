"use client";


import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async (id) => {
    const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${id}?fields=product_name,categories,brands,image_thumb_url`);
    const data = await response.json();
    return data.product;
  };

  useEffect(() => {
    getProduct(id).then(product => setProduct(product));
  }, [id]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {product && (
        <div className="flex flex-col border p-4 m-2 w-64">
          <h2 className="text-xl font-bold mb-2">{product.product_name}</h2>
          <img src={product.image_thumb_url} alt={product.product_name} className="w-full h-64 object-cover mb-2" />
          <p className="text-sm text-gray-500">{product.brands}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;