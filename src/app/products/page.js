'use client';

import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

import {
  addProduct,
  deleteProduct,
  fetchProducts,
  removeProduct,
} from '@/redux/reducers/products';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (error) {
      alert(error.message || 'Something went wrong');
    }
  }, [error]);
  //   console.log('error', error);
  //   console.log('data', products);
  //   console.log('status', status);

  return (
    <main className="flex min-h-screen text-black flex-col bg-white items-center justify-between p-24">
      {status === 'loading' && (
        <h3 className="text-black text-xl">Loading...</h3>
      )}
      <div className="mt-10 ">
        <button
          className="p-1 bg-black text-white"
          onClick={() =>
            dispatch(
              addProduct({
                name: `Product name ${products?.length + 1}`,
                price: 20,
              }),
            )
          }
        >
          Add Product
        </button>
        {products?.map((item, i) => (
          <div key={i + 1} className="flex my-1.5 items-center">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-16 w-16 mr-2 shadow"
            />
            <span>
              {item.id}. {item.title} - [{item.brand}] Rs. {item.price}/-
            </span>{' '}
            <button
              className="ml-4"
              onClick={() => {
                dispatch(deleteProduct(item.id));
                // dispatch(removeProduct({ id: i }));
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
