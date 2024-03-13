import { GetServerSideProps } from 'next';
import React from 'react';

const ProductsList = ({ products }) => {
  return (
    <div>
      {products.map((product, index) => (
        <div key={index}>
          <h2>{product.product_name}</h2>
          <img src={product.image_url} alt={product.product_name} />
          <p>{product.ingredients_text}</p>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps = async () => {
  const response = await fetch('https://world.openfoodfacts.org/api/v0/product/737628064502.json');
  const data = await response.json();

  return {
    props: {
      products: data.products,
    },
  };
};

export default ProductsList;