'use client';

import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

import {
  incrementCount,
  decrementCount,
  resetCount,
} from '@/redux/reducers/counter';
import { addTask, removeTask, resetTasks } from '@/redux/reducers/tasks';
import {
  addProduct,
  removeProduct,
  resetProducts,
} from '@/redux/reducers/products';
import Link from 'next/link';
export default function Home() {
  const count = useSelector((state) => state.counter.value);
  const tasks = useSelector((state) => state.tasks.data);
  const products = useSelector((state) => state.products.data);

  // console.log('products', products);
  const dispatch = useDispatch();
  // const counter = useCallback((type) => dispatch({ type: type }), [dispatch]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h4 style={{ marginBottom: 16 }}>{count}</h4>
        <button
          className="p-1 bg-white text-black"
          onClick={() => dispatch(incrementCount())}
        >
          increment +
        </button>
        <button
          className="p-1 bg-white text-black"
          onClick={() => dispatch(decrementCount())}
          style={{ marginInline: 16 }}
        >
          decrement -
        </button>
        <button
          className="p-1 bg-white text-black"
          onClick={() => dispatch(resetCount())}
        >
          reset
        </button>
      </div>

      <div className="mt-10">
        <Link href="/tasks" className="p-1.5 bg-white text-black">
          Tasks
        </Link>
        <button
          className="p-1 ml-4 bg-white text-black"
          onClick={() => dispatch(resetTasks())}
        >
          Reset Tasks {tasks.length}
        </button>
      </div>
      <div className="mt-10">
        <Link href="/products" className="p-1.5 bg-white text-black">
          Go to Products
        </Link>

        <button
          className="p-1 ml-4 bg-white text-black"
          onClick={() => dispatch(resetProducts())}
        >
          Reset Products {products.length}
        </button>
      </div>
    </main>
  );
}
