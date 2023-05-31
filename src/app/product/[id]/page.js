'use client';

import { useSelector, useDispatch } from 'react-redux';

import { singleProduct } from '@/redux/reducers/products';
import { useEffect } from 'react';

export default function Home({ params: { id } }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.singleProduct);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  console.log('id', id);
  useEffect(() => {
    if (id) {
      dispatch(singleProduct(id));
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      alert(error || 'Something went wrong');
    }
  }, [error]);
  console.log('data', product);
  console.log('status', status);

  return (
    <main className="flex min-h-screen text-black flex-col bg-white products-center justify-between p-24">
      {status === 'loading' && (
        <h3 className="text-black text-xl">Loading...</h3>
      )}

      {status === 'succeeded' && (
        <div className="flex my-1.5 products-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-32 w-32 mr-2 shadow"
          />
          <span className="text-xl">
            {product.id}. {product.title} - [{product.brand}] Rs.{' '}
            {product.price}
            /-
          </span>{' '}
        </div>
      )}
    </main>
  );
}
