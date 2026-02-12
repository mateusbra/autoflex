import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function RawMaterials() {
  const [rawMaterials, setRawMaterials] = useState<any[]>([]);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');

  async function load() {
    const res = await api.get('/raw-materials');
    setRawMaterials(res.data);
  }

  async function create() {
    await api.post('/raw-materials', {
      code,
      name,
      stock: Number(stock),
    });

    setCode('');
    setName('');
    setStock('');
    load();
  }

  async function remove(code: string) {
    await api.delete(`/raw-materials/${code}`);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1>Raw Materials</h1>

      <input placeholder="Code" value={code} onChange={e => setCode(e.target.value)} />
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />

      <button onClick={create}>Create</button>

      <ul>
        {rawMaterials.map(r => (
          <li key={r.id}>
            {r.code} - {r.name} - Stock: {r.stock}
            <button onClick={() => remove(r.code)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
