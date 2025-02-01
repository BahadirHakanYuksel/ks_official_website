import { useParams } from "react-router-dom";
import EditTeam from "../EditTeam";
import { useEffect, useState } from "react";

export default function EditCounsellor() {
  const { counsellorId } = useParams();
  const [counsellor, setCounsellor] = useState(false);
  const getCounsellor = async () => {
    const request_url = import.meta.env.VITE_REQUEST_URL;
    const get_counsellor = import.meta.env.VITE_REQUEST_COUNSELLOR_GET;
    const formData = new FormData();
    formData.append("action", get_counsellor);
    formData.append("counsellor_id", counsellorId);
    try {
      await fetch(request_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          setCounsellor(db[0]);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getCounsellor();
  }, [counsellorId]);

  return <EditTeam edit_data={counsellor} operationId={2} />;
}
