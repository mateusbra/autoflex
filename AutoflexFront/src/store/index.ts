import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './products.slice';
import rawMaterialsReducer from './rawMaterials.slice';
import productMaterialsReducer from './productMaterials.slice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    rawMaterials: rawMaterialsReducer,
    productMaterials: productMaterialsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;