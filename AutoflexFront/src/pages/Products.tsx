import { useEffect, useState } from 'react';
import { api } from '../api/client';
import TextInput from '../components/TextInput';
import ProductCard from '../components/ProductCard';

export default function Products() {
    const [products, setProducts] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [price, setPrice] = useState('');

    async function load() {
        const res = await api.get('/products');
        setProducts(res.data);
    }

    async function create() {
        try {
            const res = await api.post('/products', {
                code,
                name,
                price: Number(price),
            });
            console.log(res);
        } catch (e) {
            console.log(e);
        }

        setName('');
        setCode('');
        setPrice('');
        load();
    }

    async function remove(code: string) {
        await api.delete(`/products/${code}`);
        load();
    }

    useEffect(() => {
        load();
    }, []);

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
                    <ProductCard key={p.code} code={p.code} name={p.name} price={p.price} remove={remove} />
                ))}
            </ul>
        </div>
    );
}
