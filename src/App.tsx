import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ScenesPage from './pages/ScenesPage';
import SceneDetailPage from './pages/SceneDetailPage';
import CategoriesPage from './pages/CategoriesPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scenes" element={<ScenesPage />} />
            <Route path="/scenes/:id" element={<SceneDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
