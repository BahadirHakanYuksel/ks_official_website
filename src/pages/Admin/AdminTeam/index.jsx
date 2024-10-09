import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import Supporter from "../../Team/Supporter";
import classNames from "classnames";
import EditTeam from "./EditTeam";
import { useSelector } from "react-redux";
import DeleteModal from "./DeleteModal";

export default function AdminTeam() {
  const [action, setAction] = useState(0);
  const actions = ["Tüm Danışmanlar", "Yeni Danışman Ekle"];

  const [counsellors, setCounsellors] = useState([]);

  const { teamModal } = useSelector((state) => state.modal);

  const getCounsellors = async () => {
    const formData = new FormData();
    formData.append("action", "team");

    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          setCounsellors(db);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    action === 0 && getCounsellors();
  }, [action]);

  return (
    <div className="flex flex-col relative">
      {teamModal && <DeleteModal />}
      <PageTitle>
        {action === 0 && "All Supporters"}
        {action === 1 && "Add Supporter"}
        {action === 2 && "Edit Supporter"}
      </PageTitle>
      <div className="w-full flex justify-center gap-5 mb-16 -mt-2.5">
        {actions.map(
          (act, i) =>
            action !== i && (
              <button
                onClick={() => setAction(i)}
                className={classNames(
                  "bg-preKsBoxBack hover:border-ksGreen duration-200 text-myText text-lg font-medium w-52 rounded-full h-12 border-2 border-solid border-preKsBoxIcon opacity-60 pointer-events-none",
                  {
                    "!opacity-100 !pointer-events-auto": action !== i,
                  }
                )}
              >
                {act}
              </button>
            )
        )}
      </div>
      {action !== 0 ? (
        <EditTeam operationId={action} />
      ) : (
        <div className="w-full flex gap-x-5 gap-y-16 flex-wrap justify-center">
          {counsellors.map((counsellor, i) => (
            <Supporter
              admin
              setSupporterAction={setAction}
              key={i}
              id={counsellor.counsellor_id}
              img_url={counsellor.counsellor_img_url}
              name={counsellor.counsellor_name}
              surname={counsellor.counsellor_surname}
              description={counsellor.counsellor_dsc}
              social_links={
                counsellor.counsellor_links !== null
                  ? JSON.parse(counsellor.counsellor_links)
                  : []
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
