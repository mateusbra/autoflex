import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Products from './pages/Products';
import RawMaterials from './pages/RawMaterials';
//import ProductionPlan from './pages/ProductionPlan';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Products</Link> | 
        <Link to="/raw-materials">Raw Materials</Link> | 
        <Link to="/production">Production</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/raw-materials" element={<RawMaterials />} />
        
      </Routes>
    </BrowserRouter>
  );
}