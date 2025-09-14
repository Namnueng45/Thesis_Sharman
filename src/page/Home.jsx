import "./home.css";
import { useEffect } from "react";
import { useState } from "react";
import bgsection1 from "../assets/section1.jpg";
import bgsection3 from "../assets/section3.jpg";

function Home() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30; // range -15 ~ 15
      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      // BG (ไกลสุด)
      const bg = document.querySelector(".parallax-bg");
      if (bg) bg.style.transform = `translate(${x / 6}px, ${y / 6}px)`;

      // House
      const house = document.querySelector(".parallax-house");
      if (house) house.style.transform = `translate(${x / 4}px, ${y / 4}px)`;

      // Tree left
      const tree1 = document.querySelector(".parallax-tree-left");
      if (tree1) tree1.style.transform = `translate(${x / 2}px, ${y / 2}px)`;

      // Tree right
      const tree2 = document.querySelector(".parallax-tree-right");
      if (tree2) tree2.style.transform = `translate(${x / 2}px, ${y / 2}px)`;

      // Ground (ขยับเล็ก ๆ ตามแนวนอนเท่านั้น)
      const ground = document.querySelector(".parallax-ground");
      if (ground) ground.style.transform = `translateX(${x / 3}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [activeChar, setActiveChar] = useState("kla");
  const characters = {
    kla: {
      name: "กล้า",
      description: (
        <>
          ชายหนุ่มผู้ชอบปลอมเป็นหมอผี <br />
          หลอกชาวบ้าน
          <br />
          เพื่อหาเงินมีนิสัยขี้กลัว
          <br /> ไม่มีพลังวิเศษใดๆ <br />
          และไม่เคยเจอผีจริงๆสักครั้ง
        </>
      ),
      image: "/img/parallax/kraCharactor.png",
      icon: "/img/parallax/iconchar1.png",
      size: "w-[20vw] sm:w-[25vw] md:w-[20vw]",
      rightClass: "right-[12vw] sm:right-[5vw] md:right-[22vw]",
    },

    char3: {
      name: "ชายสูงวัย",
      description: (
        <>
          ชายสูงวัย เจ้าของคฤหาสต์ปริศนา <br />
          ผู้ชอบสะสมของประหลาดไว้เต็มบ้าน <br />
          โดยไม่เคยรู้ที่มาของ สิ่งของนั้นเลย
        </>
      ),
      image: "/img/parallax/kraCharactor.png",
      icon: "/img/parallax/iconchar1.png",
      size: "w-[33vw]", // ขนาดรูปใหญ่
      rightClass: "right-[12vw] sm:right-[5vw] md:right-[22vw]", // ตำแหน่ง right
    },
    bodyguard: {
      name: "บอดี้การ์ด",
      description: (
        <>
          คู่หูบอดี้การ์ด มาดเข้ม <br />
          ไม่ค่อยพูดจา มีหน้าที่แค่ทำตามคำสั่ง
          <br />
          ที่ได้รับมอบหมายมาเท่านั้น
        </>
      ),
      image: "/img/parallax/guardCharactor.png",
      icon: "/img/parallax/iconchar2.png",
      size: "w-[33vw]", // ขนาดรูปใหญ่
      rightClass:
        "right-[12vw] sm:right-[5vw] md:right-[22vw] lg:right-[8vw] xl:right-[10vw] 2xl:right-[15vw]", // ตำแหน่ง right
    },
    char4: {
      name: "วิญญาณปริศนา",
      description: (
        <>
          วิญญาณปริศนา ที่คอยปรากฏอยู่ในคฤหาสต์ <br /> ไม่ทราบที่มา...
        </>
      ),
      image: "/img/parallax/char4.png",
      icon: "/img/parallax/iconchar1.png",
      size: "w-[33vw]", // ขนาดรูปใหญ่
      right: "12vw", // ตำแหน่ง right
    },
  };
  return (
    <>
      <section className="relative h-[50vw]">
        {/* Background */}
        <div
          className="absolute w-[102%] h-full z-0 bg-cover bg-center brightness-70 blur-[2px] top-0 left-[-10px] parallax-bg"
          style={{ backgroundImage: `url(${bgsection1})` }}
        ></div>

        {/* บ้าน */}
        <img
          src="/img/parallax/Homesick.png"
          alt="house"
          className="absolute bottom-0 left-3/7 -translate-x-1/2 z-5 w-[56vw] parallax-house"
        />

        {/* ต้นไม้ l */}
        <img
          src="/img/parallax/tre1.png"
          alt="tree"
          className="absolute bottom-[6vw] left-[-1vw] z-20 w-[36vw] parallax-tree-left"
        />

        {/* ต้นไม้ r */}
        <img
          src="/img/parallax/tre3.png"
          alt="tree"
          className="absolute bottom-[7vw] right-[-1.5vw] z-20 w-[35%] parallax-tree-right filter brightness-0"
        />

        {/* พื้น */}
        <img
          src="/img/parallax/ground.png"
          alt="ground"
          className="absolute bottom-0 left-0 w-full z-30 parallax-ground"
        />

        {/* Overlay gradient ดำ → โปร่งใส */}
        <div className="absolute z-11 top-0 left-0 w-full h-50 bg-gradient-to-b from-black/100 via-black/65 to-transparent"></div>

        {/* Nav อยู่บน background */}
        <nav className="relative z-100 flex flex-wrap justify-between items-center p-6 pr-15">
          <div className="logosvg flex-1">
            <img
              src="/img/logo/sharmanLogo.svg"
              alt="logosharman"
              // style={{ width: "93px", height: "42px" }}
            />
          </div>
          <ul className="navbar flex flex-1 justify-between text-center max-w-[550px]">
            <li>
              <a href="#synopsis" className="text-white">
                เรื่องย่อ
              </a>
            </li>
            <li>
              <a href="#characters" className="text-white">
                ตัวละคร
              </a>
            </li>
            <li>
              <a href="#trailer" className="text-white">
                ตัวอย่าง
              </a>
            </li>
            <li>
              <a href="#gallery" className="text-white">
                รูปภาพ
              </a>
            </li>
            <li>
              <a href="#results" className="text-white">
                ผลลัพธ์
              </a>
            </li>
          </ul>
        </nav>

        {/* Content ของ hero */}
        {/* ชื่อเรื่อง Sharman */}
        <div className="canvas_hero relative z-21 flex flex-col items-center justify-center h-[40vw] ">
          <img
            src="/img/logo/logogo.png"
            alt="logosharman"
            className="shamanlogo absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw]"
          />
          {/* Content ข้อความ และปุ่ม */}
          <div className="content_hero text-center text-white mt-[14vw] tracking-widest">
            <p className="font-[100] text-sm sm:text-base md:text-lg lg:text-xl">
              ภาพยนตร์มีเรื่องนี้มีรูปแบบ Interactive
            </p>
            <p className="font-[100] text-sm sm:text-base md:text-lg lg:text-xl">
              ผู้ชมจะได้มีส่วนร่วมกำหนดเส้นทางและชะตากรรมของเรื่อง..
            </p>
            <p className="bt_sharman font-[100] text-sm sm:text-base md:text-lg lg:text-xl mt-[1.5vw] mb-[3vw]">
              ทุกการตัดสินใจที่คุณเลือก...จะเปลี่ยนตอนจบไปตลอดกาล
            </p>
          </div>

          <button className="buttonPlay tracking-widest border-2 p-3 text-white rounded-lg pl-20 pr-20 text-lg font-bold">
            ดูภาพยนต์
          </button>
        </div>
      </section>

      {/* section เรื่องย่อ */}
      <section className="relative h-[50vw] flex items-center">
        {/* background */}
        <div
          className="absolute w-[102%] h-[50vw] z-10 bg-cover bg-center brightness-70 blur-[4px] top-0 left-[-10px]"
          style={{ backgroundImage: `url(${bgsection1})` }}
        ></div>
        {/* ต้นไม้ r */}
        <img
          src="/img/parallax/tre3.png"
          alt="tree"
          className="absolute bottom-[0vw] right-[0vw] z-10 w-[55%] parallax-tree-right filter brightness-0 blur-[6px]"
        />

        {/* Overlay gradient ดำ → โปร่งใส */}
        <div className="overlayupper absolute z-11 top-0 left-0 w-full h-50 bg-gradient-to-b from-black/100 via-black/50 to-transparent"></div>
        {/* Overlay gradient ดำ → โปร่งใส */}
        {/* <div className="absolute z-11 top-0 left-0 w-full h-60 bg-gradient-to-b from-black/80 via-black/30 to-transparent"></div> */}
        {/* Overlay gradient ดำ → โปร่งใส buttom */}
        <div className="overlayupper absolute z-11 bottom-0 left-0 w-full h-50 bg-gradient-to-t from-black/100 via-black/50 to-transparent"></div>

        {/* content */}
        <div className="absolute text-start pl-30 z-20 text-white">
          <h2
            className="Head_storytext text-[128px] text-[#C23213] font-light"
            style={{ fontFamily: '"MAX somsin", sans-serif' }}
          >
            เรื่องย่อ
          </h2>
          <p className="content_text text-[20px] font-normanl leading-9 tracking-[0.13vw] mt-[-25px]">
            เรื่องราวของหมอผีหนุ่มผู้ไม่มีพลังวิเศษใดๆมีอาชีพหลอกชาวบ้านเพื่อหาเงิน{" "}
            <br />
            ถูกชายลึกลับเชิญตัวไปแบบไม่ตั้งใจ เมื่อเข้ามาถึงภฤหาสต์ใหญ่หลังหนึ่ง{" "}
            <br />
            กลับพบกับสิ่งมีชีวิตปริศนาทำให้เขาต้องเผชิญกับ
            <span className="pl-1 text-2xl text-[#D52E0A] font-bold">
              อันตราย
            </span>
            <br />
            และหาทางมีชีวิตรอดกลับออกมาให้ได้
          </p>
        </div>
      </section>

      {/* section Charactor */}
      <section className="relative h-[50vw] flex items-start">
        {/* background */}
        <div
          className="absolute w-[102vw] h-[50vw] z-10 bg-cover bg-center brightness-70 blur-[3px] top-0 left-[-10px]"
          style={{ backgroundImage: "url('/img/parallax/section3.jpg')" }}
        ></div>

        {/* Overlay gradient */}
        <div className="overlayupper absolute z-11 top-0 left-0 w-full h-50 bg-gradient-to-b from-black/100 via-black/50 to-transparent"></div>
        <div className="absolute z-11 bottom-0 left-0 w-full h-50 bg-gradient-to-t from-black/100 via-black/50 to-transparent"></div>

        {/* content Charactor */}
        <div className="main_section absolute text-start z-20 text-white top-[6vw] left-[20vw]">
          {/* ชือ section : ตัวละคร */}
          <h2
            className="Head_storytext text-[128px] text-[#C23213] font-light"
            style={{ fontFamily: '"MAX somsin", sans-serif' }}
          >
            ตัวละคร
          </h2>
          <div className="flex gap-[3vw]">
            {/* รูปเลือกตัวละคร */}
            <div className="flex flex-col gap-6">
              {Object.keys(characters).map((key) => (
                <img
                  key={key}
                  src={characters[key].icon}
                  alt={characters[key].name}
                  className={`selectorChar w-[10vw] cursor-pointer transition-all duration-300 
                    ${
                      activeChar === key
                        ? "opacity-100 scale-105 border-2 border-red-500 rounded-md"
                        : "opacity-50 hover:opacity-100"
                    } `}
                  onClick={() => setActiveChar(key)}
                />
              ))}
            </div>

            {/* ข้อมูลตัวละคร */}
            <div className="relative flex flex-col">
              {/* ชื่อ */}
              <h3
                className="Head_name text-[90px] text-white font-light mb-[-10px]"
                style={{ fontFamily: '"MAX somsin", sans-serif' }}
              >
                {characters[activeChar].name}
              </h3>
              {/* เส้น */}
              <div className="border-b border-[#DCDCDC] w-78 border-[0.5px]"></div>
              <div className="mt-[1.8vw]">
                <p className="content_textChar text-[20px] font-normal leading-10 tracking-[0.14vw]">
                  {characters[activeChar].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* รูปใหญ่ */}
        <div
          className={`absolute top-[5vw] z-20 ${characters[activeChar].size} ${characters[activeChar].rightClass}`}
        >
          <img
            src={characters[activeChar].image}
            alt={characters[activeChar].name}
          />
        </div>
      </section>
    </>
  );
}

export default Home;
