import Link from "next/link";

const ProductsCard = ({ product }) => {
  const {
    product_name,
    brands,
    categories,
    image_url,
    nutriscore_grade,
    code,
  } = product;
  return (
    <article
      id={`card-${code}`}
      className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 
      rounded-sm shadow-sm hover:shadow-md transition duration-300 ease-in-out max-w-[310px] w-full min-h-[280px] 
      h-full"
    >
      <Link href={`/products/${code}`}>
        <div className="flex flex-col justify-center items-center">
          <img src={image_url} alt={product_name} className="h-40 w-auto" />
          <div id={`card-body${code}`}>
            <h3 className="text-lg text-start">
              {product_name}-{brands}
            </h3>
            <p>{nutriscore_grade}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export { ProductsCard };
