import React from 'react';
import ProductCard from '@/components/dashboard/ProductCard';
import styles from '@/styles/ProductList.module.css';

export default function ProductList({ theme, products }) {
  return (
    <div className={`${styles.ProductList}`}>
      {products.map((product) => (
        <div key={product.id} className={`${styles.ProductCard}`}>
          <ProductCard product={product} theme={theme} />
        </div>
      ))}
    </div>
  );
}
