import UsersSidebar from './UsersSidebar';
import Header from '../commoncomponents/Header';
// import DashboardContent from './DashboardContent';

function UserDashboardLayout() {
  return (
    <div className="flex h-screen bg-[#F7F8FC]">
      <UsersSidebar />

      <div className="ml-64 flex flex-col w-[calc(100%-16rem)]">
        <Header />

        <div className="flex-1 overflow-y-auto">
          {/* <DashboardContent /> */}
        </div>
      </div>
    </div>
  );
}

export default UserDashboardLayout;
