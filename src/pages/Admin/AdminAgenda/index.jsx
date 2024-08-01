import { useEffect } from "react";
import { useParams } from "react-router-dom";

function AdminAgenda() {
  const { pathAdminCategory } = useParams();

  useEffect(() => {
    // db actions
  }, [pathAdminCategory]);

  return <div>Admin Agenda</div>;
}

export default AdminAgenda;
