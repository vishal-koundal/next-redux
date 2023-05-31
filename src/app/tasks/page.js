'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

import { addTask, removeTask, resetTasks } from '@/redux/reducers/tasks';

export default function Home() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.data);

  return (
    <main className="flex min-h-screen bg-black flex-col  items-center justify-between p-24">
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
          Reset
        </button>

        {tasks?.map((item, i) => (
          <div key={item} className="flex text-white my-2">
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
    </main>
  );
}
