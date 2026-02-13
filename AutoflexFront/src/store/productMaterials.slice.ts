import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api/client';

export const fetchProductMaterials = createAsyncThunk(
  'productMaterials/fetch',
  async () => {
    const res = await api.get('/product-materials');
    return res.data;
  }
);

const slice = createSlice({
  name: 'productMaterials',
  initialState: {
    items: [] as any[],
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductMaterials.pending, s => {
        s.loading = true;
      })
      .addCase(fetchProductMaterials.fulfilled, (s, a) => {
        s.items = a.payload;
        s.loading = false;
      });
  },
});

export default slice.reducer;
