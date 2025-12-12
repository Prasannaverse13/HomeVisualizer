import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Search } from './pages/Search';
import { ProductDetails } from './pages/ProductDetails';
import { Profile } from './pages/Profile';
import { Upload } from './pages/Upload';
import { Processing } from './pages/Processing';
import { Designer } from './pages/Designer';
import { Settings } from './pages/Settings';
import { BottomNav } from './components/BottomNav';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  // Hide nav on immersive screens or specific flows
  const hideNavRoutes = ['/', '/onboarding', '/upload', '/processing', '/designer'];
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex justify-center bg-black font-sans text-white">
      {/* Mobile Container Simulator */}
      <div className="w-full max-w-md h-[100dvh] bg-black relative overflow-hidden flex flex-col sm:rounded-[2.5rem] sm:my-4 sm:h-[95vh] sm:border-[6px] sm:border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <main className={`flex-1 overflow-y-auto no-scrollbar ${showNav ? 'pb-28' : 'pb-0'}`}>
          {children}
        </main>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/designer" element={<Designer />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;