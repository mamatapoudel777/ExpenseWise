// components/DashboardLayout.jsx
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardContent from './DashboardContent';

function DashboardLayout() {
  return (
    <div className="flex h-screen bg-[#F7F8FC]">
      {/* 1. Sidebar */}
      <Sidebar />

      <div className="ml-64 flex flex-col w-[calc(100%-16rem)]">
        {/* Header is sticky on top */}
        <Header />

        <div className="flex-1 overflow-y-auto">
          <DashboardContent />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
