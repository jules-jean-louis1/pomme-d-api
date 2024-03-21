"use client";

import * as React from "react";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const DialogSearchProduct = ({
  query,
  setQuery,
  selectedProduct,
  setSelectedProduct,
  onClose,
}) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL_V1 = `https://fr.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&fields=abbreviated_product_name_fr,brands,code,generic_name_fr,image_front_small_url,nutrient_levels,nutriments,nutriscore,quantity,nutriscore_grade`;
  const searchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL_V1);
      const data = await response.json();

      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickProduct = (product) => {
    setSelectedProduct(product);
    onClose?.();
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.length >= 3) {
        searchProducts();
      } else {
        setProducts([]);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query]);
  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex items-center border rounded-lg w-full px-2 focus-visible:">
        <Search />
        <Input
          defaultValue={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un produit"
          className="border-none focus-visible:ring-0"
        />
        {query.length > 0 && (
          <X onClick={() => setQuery("")} className="cursor-pointer" />
        )}
      </div>
      {products.length > 0 && query.length > 0 && (
        <div
          className={
            "min-h-fit max-h-[350px] w-full overflow-y-auto bg-white z-40"
          }
        >
          {products.map((product) => (
            <article
              key={product.code}
              onClick={() => handleClickProduct(product)}
              className="max-h-16 flex items-center"
            >
              <img
                src={product.image_front_small_url}
                alt={product.abbreviated_product_name_fr}
                className="h-16 w-auto"
              />
              <p>{product.product_name}</p>
              <p>{product.brands}</p>
              <p>{product.quantity}</p>
              <p>{product.nutriscore_grade}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default DialogSearchProduct;
