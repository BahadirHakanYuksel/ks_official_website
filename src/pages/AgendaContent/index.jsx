import { useEffect } from "react";
import { useParams } from "react-router-dom";

function AgendaContent() {
  const { pathAgendaInfo } = useParams();

  useEffect(() => {
    //id -> pathAgendaInfo.split("-")[pathAgendaInfo.split("-").length - 1]
  }, [pathAgendaInfo]);

  return <div className="page">agenda content</div>;
}

export default AgendaContent;
