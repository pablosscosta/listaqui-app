import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChooseHousePage from './pages/ChooseHousePage';
import DashboardPage from './pages/DashboardPage';
import HouseDetailsPage from './pages/HouseDetailsPage';
import CreateHousePage from './pages/CreateHousePage'; 
import ListPage from './pages/ListPage'; // Importe a nova página

function App() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<LandingPage />} />

      {/* Rotas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/choose-house" element={<ChooseHousePage />} />
        <Route path="/houses/:id" element={<HouseDetailsPage />} />
        <Route path="/create-house" element={<CreateHousePage />} />
        {/* Nova rota para a página de detalhes da lista */}
        <Route path="/houses/:houseId/lists/:listId" element={<ListPage />} />
      </Route>
    </Routes>
  );
}

export default App;