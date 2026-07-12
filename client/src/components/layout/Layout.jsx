import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { GradientDefs } from '../ui/BrandIcon';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <GradientDefs />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
