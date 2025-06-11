import React from 'react';
import { BarChart2Icon, BookOpenIcon, HomeIcon, LineChartIcon, LogOutIcon, SettingsIcon } from 'lucide-react';
interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
const Layout: React.FC<LayoutProps> = ({
  children,
  activeTab,
  setActiveTab
}) => {
  const navItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: <HomeIcon size={20} />
  }, {
    id: 'tradelog',
    label: 'Trade Log',
    icon: <BarChart2Icon size={20} />
  }, {
    id: 'notebook',
    label: 'Notebook',
    icon: <BookOpenIcon size={20} />
  }, {
    id: 'performance',
    label: 'Performance',
    icon: <LineChartIcon size={20} />
  }];
  return <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">TradingJournal</h1>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map(item => <li key={item.id}>
                <button onClick={() => setActiveTab(item.id)} className={`w-full flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              </li>)}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                JD
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">Trader</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-1 rounded-md text-gray-400 hover:text-gray-500">
                <SettingsIcon size={18} />
              </button>
              <button className="p-1 rounded-md text-gray-400 hover:text-gray-500">
                <LogOutIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>;
};
export default Layout;