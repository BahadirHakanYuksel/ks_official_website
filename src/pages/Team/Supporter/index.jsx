export default function Supporter({
  img_url = false,
  social_links = false,
  name_and_surname = "Undefined Supporter",
  description,
}) {
  return (
    <div className="w-[320px] aspect-square h-auto bg-preKsBoxBack border-2 border-solid border-ksGrayTp hover:border-ksGreen rounded-md duration-200 p-5 pt-14 shadow-lg relative">
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-goUpButtonBack border-4 border-solid border-backColor
     w-[90px] h-auto aspect-square rounded-lg -top-[90px] translate-y-1/2 text-titleColor font-medium text-4xl flex items-center justify-center overflow-hidden"
      >
        {img_url ? (
          <img src={img_url} className="w-full aspect-square" alt="" />
        ) : (
          <div className="bg-transparent">
            {name_and_surname.split(" ").map(
              (word, i) =>
                i < 3 && (
                  <span key={i} className="text-ksGreen">
                    {word.slice(0, 1).toUpperCase()}
                  </span>
                )
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3.5">
        <header
          title={name_and_surname}
          className="text-center text-xl font-medium text-titleColor line-clamp-1"
        >
          {name_and_surname}
        </header>
        <p className="line-clamp-6 text-sm h-[120px]">{description}</p>

        <div className="flex flex-col gap-1.5">
          <header className="relative text-sm font-medium text-titleColor ">
            Sosyal Medya Hesapları
          </header>
          <div className="grid grid-cols-4 gap-2.5 items-center">
            <a
              href=""
              className="border-2 border-solid border-ksGrayTp bg-backColor flex items-center justify-center text-myText hover:text-ksGreen duration-200 h-8"
            >
              a
            </a>
            <a
              href=""
              className="border-2 border-solid border-ksGrayTp bg-backColor flex items-center justify-center text-myText hover:text-ksGreen duration-200 h-8"
            >
              a
            </a>
            <a
              href=""
              className="border-2 border-solid border-ksGrayTp bg-backColor flex items-center justify-center text-myText hover:text-ksGreen duration-200 h-8"
            >
              a
            </a>
            <a
              href=""
              className="border-2 border-solid border-ksGrayTp bg-backColor flex items-center justify-center text-myText hover:text-ksGreen duration-200 h-8"
            >
              a
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
