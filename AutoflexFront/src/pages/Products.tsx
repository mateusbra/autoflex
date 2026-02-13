import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextInput from '../components/TextInput';
import ProductCard from '../components/ProductCard';

import { RootState, AppDispatch } from '../store';
import {
  fetchProducts,
  createProduct,
} from '../store/products.slice';

export default function Products()   {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector((state: RootState) => state.products.items);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  async function create() {
    await dispatch(createProduct({
      code,
      name,
      price: Number(price),
    }));

    setName('');
    setCode('');
    setPrice('');

    dispatch(fetchProducts());
  }

  return (
    <div className='min-h-screen flex justify-center items-center flex-col gap-8'>
      <main className='max-w-md bg-white p-8 rounded shadow text-black'>
        <section className='flex justify-center items-center flex-col'>
          <h1>Products</h1>

          <div className='flex justify-center items-center flex-col gap-4'>
            <TextInput placeholder="Code" value={code} onChange={setCode} />
            <TextInput placeholder="Name" value={name} onChange={setName} />
            <TextInput placeholder="Price" value={price} onChange={setPrice} />
          </div>

          <button onClick={create}>Create</button>
        </section>
      </main>

      <ul className='flex gap-4 flex-wrap justify-center items-center'>
        {products.map(p => (
          <ProductCard
            key={p.code}
            code={p.code}
            name={p.name}
            price={p.price}
          />
        ))}
      </ul>
    </div>
  );
}
