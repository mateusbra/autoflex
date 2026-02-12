
import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function ProductMaterials() {
  const [products, setProducts] = useState<any[]>([]);
  const [rawMaterials, setRawMaterials] = useState<any[]>([]);
  const [productCode, setProductCode] = useState('');
  const [rawMaterialCode, setRawMaterialCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [associations, setAssociations] = useState<any[]>([]);

  async function load() {
    const p = await api.get('/products');
    const r = await api.get('/raw-materials');
    const pm = await api.get('/product-materials');

    setProducts(p.data);
    setRawMaterials(r.data);
    setAssociations(pm.data);
  }

  async function create() {
    await api.post('/product-materials', {
      productCode,
      rawMaterialCode,
      quantity: Number(quantity),
    });

    setQuantity('');
    load();
  }

  async function remove(productCode: string, rawMaterialCode: string) {
    await api.delete(`/product-materials/${productCode}/${rawMaterialCode}`);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1>Product Materials</h1>

      <select value={productCode} onChange={e => setProductCode(e.target.value)}>
        <option value="">Select Product</option>
        {products.map(p => (
          <option key={p.code} value={p.code}>{p.code}</option>
        ))}
      </select>

      <select value={rawMaterialCode} onChange={e => setRawMaterialCode(e.target.value)}>
        <option value="">Select Raw Material</option>
        {rawMaterials.map(r => (
          <option key={r.code} value={r.code}>{r.code}</option>
        ))}
      </select>

      <input
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />

      <button onClick={create}>Associate</button>

      <ul>
        {associations.map(a => (
          <li key={a.id}>
            {a.product.code} → {a.rawMaterial.code} = {a.quantity}
            <button onClick={() => remove(a.product.code, a.rawMaterial.code)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
