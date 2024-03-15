"use client";

import * as React from "react";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SearchBar = ({ query, setQuery }) => {
  const [products, setProducts] = useState([]);

  const searchProducts = async (query) => {
    const API_URL_V1 = `https://fr.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&fields=abbreviated_product_name_fr,brands,code,generic_name_fr,image_front_small_url,nutrient_levels,nutriments,nutriscore`;

    try {
      const response = await fetch(`${API_URL_V1}`);
      const data = await response.json();
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        searchProducts(query);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query]);
  return (
    <div className="flex flex-col max-w-[600px]">
      <div className="flex items-center p-2 border rounded-lg">
        <Input
          type="text"
          placeholder="Rechercher un produit"
          onChange={(e) => setQuery(e.target.value)}
          className="border-none"
        />
      </div>
      <div className="h-full max-h-[600px] overflow-y-auto border rounded-lg z-50 bg-white">
        {products.length > 0 && (
          <Table>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.code}>
                  <TableCell>
                    <img
                      src={product.image_front_small_url}
                      alt={product.abbreviated_product_name_fr}
                    />
                  </TableCell>
                  <TableCell>{product.abbreviated_product_name_fr}</TableCell>
                  <TableCell>{product.brands}</TableCell>
                  <TableCell>{product.categories_tags}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
