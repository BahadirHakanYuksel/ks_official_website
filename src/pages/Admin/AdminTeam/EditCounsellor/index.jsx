import { useParams } from "react-router-dom";
import EditTeam from "../EditTeam";
import { useEffect, useState } from "react";

export default function EditCounsellor() {
  const { counsellorId } = useParams();
  const [counsellor, setCounsellor] = useState(false);
  const getCounsellor = async () => {
    const formData = new FormData();
    formData.append("action", "get-counsellor");
    formData.append("counsellor_id", counsellorId);
    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
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
