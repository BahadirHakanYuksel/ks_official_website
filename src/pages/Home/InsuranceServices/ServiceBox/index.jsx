function ServiceBox({ title, iconUrl }) {
  return (
    <button className="w-60 h-60 bg-preKsBoxBack text-white rounded-md border-2 border-solid border-transparent hover:border-ksGreen duration-200 shadow-2xl flex justify-center items-center flex-col gap-1.5 scale-1 hover:scale-105">
      <img className="w-32" src={`images${iconUrl}`} alt="" />
      <header className="text-xl text-myText font-medium">{title}</header>
    </button>
  );
}

export default ServiceBox;
