'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

import {
  addNewProduct,
  addProduct,
  deleteProduct,
  fetchProducts,
  removeProduct,
} from '@/redux/reducers/products';
import Link from 'next/link';

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (error) {
      alert(error.message || 'Something went wrong');
    }
  }, [error]);
  //   console.log('error', error);
  // console.log('datacc', products);
  // console.log('status', status);

  return (
    <main className="flex min-h-screen text-black flex-col bg-white items-center justify-between p-24">
      {status === 'loading' && (
        <h3 className="text-black text-xl">Loading...</h3>
      )}
      <div className="mt-10 ">
        <button
          className="p-1 bg-black text-white"
          onClick={() => dispatch(addNewProduct())}
        >
          Add Product
        </button>
        {products?.map((item, i) => (
          <div key={i + 1} className="flex my-1.5 items-center">
            <Link
              href={`/product/${item.id}`}
              className="flex my-1.5 items-center"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-20 w-20 mr-2 shadow object-cover"
              />
              <span>
                {item.id}. {item.title} - [{item.brand}] Rs. {item.price}/-
              </span>{' '}
            </Link>

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
