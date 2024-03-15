"use client";

import { ProductsCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
      <div className="lg:px-[125px] py-6">
        <section className="flex flex-col justify-center items-center space-y-4">
          <h1 className="font-bold text-5xl">
            Mangez malin, économisez intelligemment.
          </h1>
          <div className="xl:mx-96">
            <p className="text-lg text-center">
              Suivez vos dépenses alimentaires, définissez des budgets et
              découvrez des astuces pour manger mieux pour moins cher.
              Enregistrez vos favoris, recevez des recommandations
              personnalisées et explorez de nouvelles saveurs.
            </p>
          </div>
          <Button size="lg">
            <Link href="/signup" className="font-semibold text-xl">
              Commencer a utiliser Kilimi
            </Link>
          </Button>
        </section>
        <section></section>
      </div>
      <section className="flex flex-col justify-center items-center mt-12">
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
