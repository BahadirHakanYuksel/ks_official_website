export const turkishToEnglish = (text) => {
  const charMap = {
    ç: "c",
    Ç: "C",
    ğ: "g",
    Ğ: "G",
    ı: "i",
    I: "I",
    İ: "I",
    ö: "o",
    Ö: "O",
    ş: "s",
    Ş: "S",
    ü: "u",
    Ü: "U",
  };

  return text
    .split("")
    .map((char) => charMap[char] || char)
    .join("");
};

export const url_tr_data = [
  {
    first: "/about",
    second: "/hakkimizda",
  },
  {
    first: "/contact",
    second: "/iletisim",
  },

  {
    first: "/what-is-participation-insurance",
    second: "/katilim-sigortasi-nedir",
  },
  {
    first: "/corporate/dask",
    second: "/kurumsal/dask",
  },
  ,
  {
    first: "/individual/dask",
    second: "/bireysel/dask",
  },
  {
    first: "/agenda/news",
    second: "/gundem/haberler",
  },
  {
    first: "/agenda/articles",
    second: "/gundem/makaleler",
  },
  {
    first: "/agenda/announcements",
    second: "/gundem/duyurular",
  },
];

export const url_en_data = [
  {
    first: "/hakkimizda",
    second: "/about",
  },
  {
    first: "/iletisim",
    second: "/contact",
  },
  {
    first: "/katilim-sigortasi-nedir",
    second: "/what-is-participation-insurance",
  },
  ,
  {
    first: "/kurumsal/dask",
    second: "/corporate/dask",
  },
  ,
  {
    first: "/bireysel/dask",
    second: "/individual/dask",
  },
  {
    first: "/gundem/haberler",
    second: "/agenda/news",
  },
  {
    first: "/gundem/makaleler",
    second: "/agenda/articles",
  },
  {
    first: "/gundem/duyurular",
    second: "/agenda/announcements",
  },
];

export const convertFromTextToUrl = (text) => {
  const myUrl = encodeURIComponent(
    turkishToEnglish(text).replace(/ /g, "-")
  ).toLowerCase();

  return myUrl;
};

export const aboutUsTextTR =
  "# FİNANS EKOSİSTEMİNDE SAMİMİ BİR ALTENATİF YOL ÇALIŞMASI; KATILIM ESASLI SİGORTACILIK #\n-- HER ANIMIZ İÇİN ALLAHU TEALAYA HAMD OLSUN --\nFaizsiz Finans Kuruluşları Muhasebe ve Denetleme Kurumu (AAOİFİ) tarafından belirlenip, Türkiye Katılım Bankaları Birliği tarafından yayınlanan ‘‘FAİZSİZ FİNANS STANDARTLARI ’’ kitabının SUNUŞ yazısı şöyle başlıyor. ‘‘ Dünyadaki finans ekosisteminin temelini teşkil eden faizin, dinimizce haram kılınmış olması Müslüman toplumların ayrı bir ekosistemi oluşturmasına sebebiyet vermiştir. Dünyanın geri kalanında İslami Finans olarak anılan bu finans sistemi ülkemizde ’’ KATILIM BANKACILIĞI ‘‘ olarak telaffuz edilmektedir. Bu finans kuruluşları faizsiz, İslami esaslara uygun işlem yapmaları dolayısıyla diğer finans kuruluşlarından ayrılmaktadır. Katılım bankaları mevcut sistemde İslami esaslara uygun olan yöntemleri veya kendilerine has geliştirdikleri yöntemlerle müşterilerine hizmet vermekte ve faizden uzak durmaya çalışan atıl fonları bu sayede ekonomiye kazandırmaktadır.’’ Gündelik yaşam içerisinde dünya,  karmaşık, devasa ve sonsuz çeşitlilikteki faaliyet ve olgularla iktisadi görevlerini yerine getirirken, küresel bir ekosistem içinde, bu günden yarına tarihsel akışını da sürdürmektedir. Günümüzde bu ekosistem, her türlü fikre, düşünceye, inanışa açık bir platforma dönüşmüştür. Bu izafi açık görüşlülük ve ekonomik tolerans sayesinde, kendi gücü ve gayreti nispetinde, tüm uygulama ve çeşitliliğiyle İSLAMİ FİNANS kavramı, başka bir deyişle KATILIM ESASLI FİNANS kavramı da bu ekosistemde yerini alacaktır. Bu nedenle artık, KATILIM ESASLI BANKACILIK, KATILIM ESASLI SİGORTACILIK, KATILIM ESASLI YATIRIM ARAÇLARI, KATILIM ESASLI TİCARET, gibi kavramları küresel ve ulusal ekosistem içinde daha fazla konuşacak ve duyacağız.\nDaha önceki dönemde Türkiye de pencere sistemiyle, TEKAFÜL SİGORTASI adı altında katılım esaslı sigortacılık faaliyetleri yürütülüyordu ve bunun yanın da münhasıran yalnız tekafül sigortası faaliyeti yürüten sigorta şirketleri de mevcuttu. Bu faaliyetler, uygulama, denetleme, büyüme ve gelişme açısından değişik mahzurlar içeriyordu. Bu nedenle kanun koyucu, ekonomi yönetimini de ilzam edecek şekilde 19.12.2020 tarihinde, 31339 sayılı ‘‘KATILIM ESASLARI ÇERÇEVESİNDE SİGORTACILIK VE BİREYSEL EMEKLİLİK FAALİYETLERİNE İLİŞKİN YÖNETMELİK’’ çıkardı. Bu yönetmelik, 5684 sayılı Sigortacılık Kanunu ve 4632 sayılı Bireysel Emeklilik Tasarruf ve Yatırım Sistemi kanunlarına dayandırılarak çıkarıldı ve uygulamaya kondu. Bu yönetmelikle Katılım Esaslı Sigortacılığın, tanımı yapıldı, sınırları çizildi, oyuncular ve oyuncuların rollerinin çerçevesi çizildi. Elbette ki her yeni şeyin inşasında yaşanan zorluklar bu konuda da yaşandı ve bazı farklı kavram ve modeller denendi. Önceleri Türkiye Modeli Katılım Esaslı Sigortacılık, Teysir Modeli Katılım esaslı sigortacılık, Tekafül Sigortacılığı gibi kavramlardan sonra bu günkü,  çalışma şeklini deklere ederek yukarıdakilerden seçtiği modeli uygulayabilme serbestisi, her modele açık esnek bir yöntem tercih edildi. Her ne kadar farklı isimleri olsa da modellerin hepsinde, İslami kriterlerin sağlanmasının denetlenmesi için Danışma Komitesi oluşturma, konusu dinen haram sayılan ticari risklere teminat vermeme, faaliyetlerden elde edilen gelirlerin katılım esaslı yatırım araçlarında değerlendirilmesi gibi ana konular aynı olarak belirlendi.\nYönetmeliğin amacı, katılım esasları çerçevesinde sigortacılık ve bireysel emeklilik faaliyetlerinin yürütülmesi için gerekli usul ve esasları düzenlemek olarak belirlendi. Yönetmeliğin ilgili kurum ve kuruluşları belirleyen kapsamı da oldukça geniş tutulmuş. Bu yönetmeliğe göre, Türkiye de katılım esasları çerçevesinde faaliyet gösteren sigorta, reasürans, ve emeklilik şirketleri, sigorta kooperatifleri, ve özel kanunları uyarınca sigorta sözleşmesi yapan kuruluşlar, katılım esaslı faaliyetleri ile sınırlı olmak üzere, birlik, büro, merkez, komite, hesap ve havuzlar, aracılar, eksperler, ve aktüerler bu yönetmeliğin hükümlerine tabidir. Böylelikle tüm faaliyetleri katılım esaslı olmasa bile, şirketler, yaptıkları işlemlerin bir kısmı katılım esaslı finans faaliyetiyse, katılım esaslı kısım için yönetmeliğin sınırlarına dâhil edilerek yönetmeliğin kavramsal çerçevesi genişletilmiş.\nYönetmelikle birlikte Katılım Uyum Birimi, Danışma Komitesi gibi yeni kavram ve kurumlar ihdas edilmiş ve sistemin içinde bunların ne şekilde yer alacakları, görevleri, bu birimlerde yer alacak personelin özelliklerinin neler olacağı gibi hususlar tespit edilmiştir.\nGünümüzde ülkemizde, Bireysel Emeklilik Sigortası içinde hem Otomatik Katılım hem de ihiyari katılımlarda Katılım Esaslı yatırım seçenekleri olması hasebiyle, Katılım Esaslı Bireysel Emeklilik fonu yöneten tüm hayat ve emeklilik şirketleri bu yönetmeliğe göre faaliyet göstermektedir.\nHayat dışı sigortacılık branşlarında, NEOVA SİGORTA A.Ş. , TÜRKİYE KATILIM SİGORTA  A.Ş., HDI KATILIM SİGORTA A.Ş., PAY SİGORT A.Ş. gibi birinci basamak sigorta şirketleri bu yönetmeliğe göre faaliyet göstermektedir.\nReasürans alanında tek ana ortağı, TÜRK REASÜRANS A.Ş. olan birinci basamak, katılım esaslı faaliyet gösteren hayat dışı sigorta şirketlerine reasürans teminatı ve koruma sağlayan TÜRK KATILIM REASÜRANS A.Ş. bu yönetmeliğe göre faaliyet göstermektedir.\nDünya ve Türkiye ekonomisi için oldukça yeni olan, tüm bu kavram ve kurumları tanımak, kavramak, tartışmak, taraflar arasındaki ilişkileri anlamak, anlamlandırmak için,\nDünya ve Türkiye ekonomisi için oldukça yeni olan, tüm bu kavram ve kurumları tanımak, kavramak, tartışmak, taraflar arasındaki ilişkileri anlamak, anlamlandırmak için,\nKatılım Esaslı Finans alanında akademik çalışmalar içinde olan tüm akademisyenlerimize dijital bir mekân olabilmek için,\nHELAL VE İMKÂN DAİRESİNDE OLANI MÜMKÜN KILMAK İÇİN\nKatılım sigortası platformunu kurmuş bulunuyoruz.\nDua ve destek ve katkılarınızı bekliyoruz.";

export const aboutUsTextEN =
  "# A Sincere ALTENATIVE PATHWORK IN THE FINANCIAL ECOSYSTEM; PARTICIPATION-BASED INSURANCE #\n-- ALLAHU TEALAYA PRAISE FOR EVERY MOMENT --\nThe introductory article of the book ‘‘FAIS FREE FINANCE STANDARDS ’’, which was determined by the Accounting and Supervision Agency for Interest-Free Financial Institutions (AAOIFI) and published by the Participation Banks Association of Turkey, begins as follows. ‘‘ The fact that interest, which forms the basis of the financial ecosystem in the world, is forbidden by our religion has caused Muslim societies to create a separate ecosystem. This financial system, which is referred to as Islamic Finance in the rest of the world, is known as ’’ It is pronounced as ‘‘PARTICIPATION BANKING’’. These financial institutions are distinguished from other financial institutions because they carry out interest-free transactions in accordance with Islamic principles. Participation banks provide services to their customers with methods that are in accordance with Islamic principles in the current system or with methods they have developed uniquely for themselves, and in this way, they bring idle funds that try to stay away from interest into the economy. While the world fulfils its economic duties with complex, gigantic and infinite variety of activities and phenomena in daily life, it also continues its historical flow from today to tomorrow in a global ecosystem. Today, this ecosystem has turned into a platform open to all kinds of ideas, thoughts and beliefs. Thanks to this relative open-mindedness and economic tolerance, the concept of ISLAMIC FINANCE with all its applications and diversity, in other words, the concept of PARTICIPATION-BASED FINANCE will also take its place in this ecosystem. Therefore, we will talk and hear more about concepts such as PARTICIPATION-BASED BANKING, PARTICIPATION-BASED INSURANCE, PARTICIPATION-BASED INVESTMENT INSTRUMENTS, PARTICIPATION-BASED TRADE within the global and national ecosystem.\nIn the previous period, participation-based insurance activities were carried out in Turkey under the name of TEKAFUL INSURANCE with the window system, and there were also insurance companies that exclusively carried out only takaful insurance activities. These activities had various drawbacks in terms of implementation, supervision, growth and development. For this reason, the legislator, in a way to bind the economic management, issued a law dated 19.12.2020, numbered 31339 and numbered ‘‘ A REGULATION ON INSURANCE AND PERSONAL PENSION ACTIVITIES WITHIN THE FRAMEWORK OF PARTICIPATION PRINCIPLES’’ was issued. This regulation was issued and put into practice based on the Insurance Law No. 5684 and the Individual Pension Savings and Investment System Law No. 4632. With this regulation, Participation Based Insurance was defined, its boundaries were drawn, and the roles of the players and their roles were outlined. Of course, the difficulties experienced in the construction of every new thing were also experienced in this issue and some different concepts and models were tried. After concepts such as Turkey Model Participation-Based Insurance, Teysir Model Participation-Based Insurance, Takaful Insurance, a flexible method open to every model was preferred, with the freedom to apply the model chosen from the above by declaring the way it works today. Although they have different names, the main issues such as forming an Advisory Committee to supervise the fulfilment of Islamic criteria, not providing collateral for commercial risks that are considered forbidden by religion, and investing the revenues obtained from the activities in participation-based investment instruments were determined as the same in all of the models.\nThe purpose of the Regulation was determined as regulating the procedures and principles required for the execution of insurance and private pension activities within the framework of participation principles. The scope of the regulation determining the relevant institutions and organisations is also quite broad. According to this regulation, insurance, reinsurance, and pension companies, insurance cooperatives, insurance cooperatives, and institutions that make insurance contracts in accordance with their special laws, unions, bureaus, centres, committees, accounts and pools, intermediaries, appraisers, and actuaries operating in Turkey within the framework of participation principles, limited to their participation-based activities, are subject to the provisions of this regulation. Thus, even if not all of their activities are participation-based, the conceptual framework of the regulation has been expanded by including companies within the boundaries of the regulation for the participation-based part, if some of their transactions are participation-based financial activities.\nNew concepts and institutions such as Participation Compliance Unit and Advisory Committee have been introduced with the regulation, and issues such as how they will be included in the system, their duties, and the characteristics of the personnel to be included in these units have been determined. Since there are Participation Based investment options in both Automatic Enrolment and voluntary participation in Private Pension Insurance in our country today, all life and pension companies that manage Participation Based Private Pension funds operate in accordance with this regulation.\nIn non-life insurance branches, NEOVA SİGORTA A.Ş., TÜRKİYE KATILIM SİGORTA A.Ş., HDI KATILIM SİGORTA A.Ş., PAY SİGORT A.Ş., etc. operate in accordance with this regulation.\nIn the field of reinsurance, TÜRK KATILIM REASÜRANS A.Ş., whose sole main shareholder is TÜRK REASÜRANS A.Ş., provides reinsurance coverage and protection to non-life insurance companies operating on a first-tier, participation basis. \nTo recognise, comprehend, discuss all these concepts and institutions, which are quite new for the world and Turkish economy, to understand and make sense of the relations between the parties, \nTo recognise, comprehend and discuss all these concepts and institutions, which are quite new for the world and Turkish economy, In order to understand and make sense of the relations between the parties,\nIn order to be a digital space for all our academicians who are in academic studies in the field of Participation Based Finance,\nTo MAKE POSSIBLE WHAT IS HALAL AND POSSIBLE\nWe have established the participation insurance platform. We are waiting for your prayers and support and contributions.";
