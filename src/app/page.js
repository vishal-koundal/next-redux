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
export default function Home() {
  const count = useSelector((state) => state.counter.value);
  const tasks = useSelector((state) => state.tasks.data);
  const products = useSelector((state) => state.products.data);

  console.log('products', products);
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
        <button
          className="p-1 bg-white text-black"
          onClick={() =>
            dispatch(addTask({ text: `Todo item ${tasks?.length + 1}` }))
          }
        >
          Add todo
        </button>
        <button
          className="p-1 ml-4 bg-white text-black"
          onClick={() => dispatch(resetTasks())}
        >
          reset
        </button>

        {tasks?.map((item, i) => (
          <div key={item} className="flex text-white">
            <span>{item}</span>{' '}
            <button
              className="ml-4"
              onClick={() => dispatch(removeTask({ id: i }))}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <button
          className="p-1 bg-white text-black"
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
        <button
          className="p-1 ml-4 bg-white text-black"
          onClick={() => dispatch(resetProducts())}
        >
          reset
        </button>
        {products?.map((item, i) => (
          <div key={i + 1} className="flex text-white">
            <span>
              {item.name} - Rs. {item.price}/-
            </span>{' '}
            <button
              className="ml-4"
              onClick={() => dispatch(removeProduct({ id: i }))}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
