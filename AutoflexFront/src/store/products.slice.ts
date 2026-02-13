import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api/client';

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async () => {
    const res = await api.get('/products');
    return res.data;
  }
);

export const createProduct = createAsyncThunk(
  'products/create',
  async (data: { code: string; name: string; price: number }) => {
    await api.post('/products', data);
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (code: string) => {
    await api.delete(`/products/${code}`);
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async (data: { code: string; name: string; price: number }) => {
    await api.put(`/products/${data.code}`, {
      name: data.name,
      price: data.price,
    });
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [] as any[],
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
