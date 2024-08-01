import { Outlet } from "react-router-dom";

function AgendaLayout() {
  return (
    <div className="flex flex-col gap-10">
      <header>agenda nav</header>
      <div className="page">
        <Outlet />
      </div>
    </div>
  );
}

export default AgendaLayout;
