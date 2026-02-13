import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api/client';

export const fetchRawMaterials = createAsyncThunk(
  'rawMaterials/fetch',
  async () => {
    const res = await api.get('/raw-materials');
    return res.data;
  }
);

const slice = createSlice({
  name: 'rawMaterials',
  initialState: {
    items: [] as any[],
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRawMaterials.pending, s => {
        s.loading = true;
      })
      .addCase(fetchRawMaterials.fulfilled, (s, a) => {
        s.items = a.payload;
        s.loading = false;
      });
  },
});

export default slice.reducer;
