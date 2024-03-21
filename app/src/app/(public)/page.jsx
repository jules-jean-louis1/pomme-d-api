"use client";

import { ProductsCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DialogSearchProduct from "@/components/DialogSearchProduct";

const Home = () => {
  const session = useSession();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState(new Date());

  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);

  console.log(selectedProduct);
  const onClose = () => {
    setQuery("");
  };
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
        {session.data ? (
          <>
            <section>
              <h1 className="text-4xl font-semibold">Bienvenue sur Kilimi</h1>
              <div className="flex item-start">
                <div className="w-fit">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Récap Journalier</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Ajouter</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">
                      <DialogHeader>
                        <DialogTitle>Ajouter un aliments</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogSearchProduct
                        query={query}
                        setQuery={setQuery}
                        selectedProduct={selectedProduct}
                        setSelectedProduct={setSelectedProduct}
                        onClose={onClose}
                      />
                      <div className="w-full">
                        {Object.keys(selectedProduct).length > 0 && (
                          <>
                            <div className="flex flex-col w-full border p-2 rounded-lg">
                              <div className="flex h-8">
                                <img
                                  src={selectedProduct.image_front_small_url}
                                  alt={
                                    selectedProduct.abbreviated_product_name_fr
                                  }
                                />
                                <h2 className="text-xl font-semibold">
                                  {selectedProduct.brands || "Inconnu"}
                                </h2>
                              </div>
                              <div className="flex items-center w-full space-x-2">
                                <div>
                                  <Label
                                    htmlFor="energy_value"
                                    className="text-right"
                                  >
                                    Quantité consommée
                                  </Label>
                                  <Input
                                    id="energy_value"
                                    className="col-span-3"
                                    placeholder="Quantité"
                                  />
                                </div>
                                <div>
                                  <Label
                                    htmlFor="energy_value"
                                    className="text-right"
                                  >
                                    Portion (unité)
                                  </Label>
                                  <Input
                                    id="energy_value"
                                    className="col-span-3"
                                    placeholder="Quantité"
                                  />
                                </div>
                                <div>
                                  <Label
                                    htmlFor="energy_value"
                                    className="text-right"
                                  >
                                    Date de consommation
                                  </Label>
                                  <Input
                                    id="energy_value"
                                    className="col-span-3"
                                    placeholder="Quantité"
                                    type="date"
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Récap Calories</h3>
                </div>
              </div>
            </section>
          </>
        ) : (
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
        )}
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
