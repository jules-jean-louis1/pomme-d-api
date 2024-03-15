"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";

const Product = () => {
  const session = useSession();
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState([]);
  const [imagesProduct, setImagesProduct] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(null);
  console.log(buttonClicked);

  const handleBack = () => {
    router.back();
  };

  const PaperInfo = ({ field, product }) => {
    return (
      <div className="bg-gray-100 w-full rounded-sm p-1">
        <div className="flex flex-col space-y-2">
          <h6 className="font-semibold">{field}</h6>
          <p>{product}</p>
        </div>
      </div>
    );
  };

  const getProduct = async () => {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/code=${id}&fields=brands,brands_tags,categories_tags,categories,carbon_footprint_percent_of_known_ingredients,categories_hierarchy,ecoscore_data,ecoscore_grade,ecoscore_score,generic_name_fr,ingredients_analysis_tags,ingredients,ingredients_text_fr,nutriscore_data,nutriscore_grade,nutriscore_score,nutriscore_tags,nutrition_data_per,packaging_hierarchy,product_name_fr,product_name,product_quantity,product_quantity_unit,quantity,serving_quantity,serving_quantity_unit,serving_size,selected_images,nutriments,nutriscore_data`
      );
      const data = await response.json();
      setProduct(data.product);
      const frontImage = data.product?.selected_images.front.display.fr;
      const ingredientsImage =
        data.product?.selected_images.ingredients.display.fr;
      const nutritionImage = data.product?.selected_images.nutrition.display.fr;
      const packagingImage = data.product?.selected_images.packaging.display.fr;
      setImagesProduct([
        frontImage,
        ingredientsImage,
        nutritionImage,
        packagingImage,
      ]);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchFavorite = async (method) => {
    try {
      const response = await fetch(
        `/api/favorites/${id}/${session.data.user.id}`,
        { method }
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getFavorite = async () => {
    const data = await fetchFavorite("GET");
    setFavorite(data.favorite);
  };

  const addFavorite = async () => {
    const data = await fetchFavorite("POST");
    if (data.message === "Favorite added") {
      setFavorite(true);
    }
  };

  const removeFavorite = async () => {
    const data = await fetchFavorite("DELETE");
    if (data.message === "Favorite removed") {
      setFavorite(false);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (session?.data?.user?.id) {
      getFavorite();
    }
  }, [session]);

  useEffect(() => {
    if (!session?.data?.user?.id || buttonClicked === null) return;
    if (favorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  }, [buttonClicked]);
  return (
    <>
      <main className="w-full h-full">
        <section className="flex flex-col lg:px-20 2xl:px-72">
          <article className="flex w-full pt-7 space-x-4 items-center">
            <Button variant="outline" size="lg" onClick={handleBack}>
              Retour
            </Button>
            <h2>
              <span className="text-3xl font-semibold">
                {product?.product_name_fr || product?.product_name}
              </span>
              <span className="text-xl ml-2">{product?.quantity}</span>
            </h2>
          </article>
          <article className="flex w-full pt-7 space-x-4 items-start">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {imagesProduct.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-0.5">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-4xl font-semibold">
                            <img src={image} alt="product" />
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="flex flex-col w-full lg:max-w-[600px] space-y-3">
              <PaperInfo field="Marque" product={product?.brands} />
              <PaperInfo
                field="Dénomination générique"
                product={product?.generic_name_fr}
              />
              <PaperInfo field="Quantité" product={product?.quantity} />
              <PaperInfo
                field="Catégories"
                product={product?.categories || product?.categories_old}
              />
            </div>
            <div
              className="p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 
      rounded-lg shadow-sm w-full"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => setButtonClicked(!favorite)}
              >
                {favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              </Button>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nutritions</TableHead>
                    <TableHead>Valeurs pour 100g</TableHead>
                    <TableHead>Valeurs par portions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Énergie</TableCell>
                    {product.nutriments && (
                      <>
                        <TableCell>
                          {product.nutriments.energy} kj (
                          {product.nutriments["energy-kcal_100g"]})g
                        </TableCell>
                        <TableCell>
                          {product.nutriments.energy_serving} kj (
                          {product.nutriments["energy-kcal_serving"]})g
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell>Matières grasses</TableCell>
                    {product.nutriments && (
                      <>
                        <TableCell>{product.nutriments.fat_100g}g</TableCell>
                        <TableCell>{product.nutriments.fat_serving}g</TableCell>
                      </>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell>Acides gras saturés</TableCell>
                    {product.nutriments && (
                      <>
                        <TableCell>
                          {product.nutriments["saturated-fat_100g"]}g
                        </TableCell>
                        <TableCell>
                          {product.nutriments["saturated-fat_serving"]}g
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell>Glucides</TableCell>
                    {product.nutriments && (
                      <>
                        <TableCell>
                          {product.nutriments.carbohydrates_100g}g
                        </TableCell>
                        <TableCell>
                          {product.nutriments.carbohydrates_serving}g
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell>Sucres</TableCell>
                    {product.nutriments && (
                      <>
                        <TableCell>{product.nutriments.sugars_100g}g</TableCell>
                        <TableCell>
                          {product.nutriments.sugars_serving}g
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </article>
          <article
            className="flex flex-col w-full pt-4 mt-4 items-start p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 
      rounded-lg shadow-sm"
          >
            <h4 className="text-2xl">Santé</h4>
            <div className="w-full">
              <PaperInfo
                field="Ingrédients"
                product={product?.ingredients_text_fr}
              />
              <PaperInfo
                field="Analyse des ingrédients"
                product={product?.ingredients_analysis_tags}
              />
              <PaperInfo
                field="Quantité de service"
                product={product?.serving_quantity}
              />
              <PaperInfo
                field="Nutri-score"
                product={product?.nutriscore_grade}
              />
              <PaperInfo field="Eco-score" product={product?.ecoscore_grade} />
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default Product;
