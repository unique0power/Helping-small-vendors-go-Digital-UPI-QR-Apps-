const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
const layoutsDir = path.join(__dirname, 'src', 'layouts');
const pagesDir = path.join(__dirname, 'src', 'pages');

const layouts = {
  'MainLayout.tsx': `import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}`,
  'DashboardLayout.tsx': `import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}`
};

const components = {
  'Navbar.tsx': `import { Link } from 'react-router-dom';
export default function Navbar() { return <nav className="fixed w-full h-16 bg-white border-b z-50">Navbar</nav>; }`,
  'Footer.tsx': `export default function Footer() { return <footer className="bg-slate-900 text-white p-8">Footer</footer>; }`,
  'Sidebar.tsx': `export default function Sidebar() { return <aside className="w-64 bg-white border-r hidden md:block h-full">Sidebar</aside>; }`,
  'DashboardHeader.tsx': `export default function DashboardHeader() { return <header className="h-16 bg-white border-b flex items-center px-6">Header</header>; }`,
};

const pages = [
  'Landing', 'Login', 'Register', 'Onboarding', 'Dashboard', 
  'DigitalTools', 'Products', 'Sales', 'Expenses', 'QrGenerator', 'Bills', 'MyShop'
];

Object.entries(layouts).forEach(([file, content]) => fs.writeFileSync(path.join(layoutsDir, file), content));
Object.entries(components).forEach(([file, content]) => fs.writeFileSync(path.join(componentsDir, file), content));
pages.forEach(page => {
  fs.writeFileSync(path.join(pagesDir, `${page}.tsx`), `export default function ${page}() { return <div>${page} Page</div>; }`);
});

console.log('Boilerplate generated successfully.');
