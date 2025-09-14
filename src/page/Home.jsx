import "./home.css";
import { useEffect } from "react";
import bgsection1 from "../assets/section1.jpg";

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

      <section
        id="synopsis"
        className="h-[50vw] bg-black text-white flex items-center justify-start"
      >
        <div className="max-w-3xl text-start pl-30">
          <h2 className="text-[90px] font-bold mb-6">เรื่องย่อ</h2>
          <p className="content_text text-lg leading-9 tracking-wider">
            เรื่องราวของหมอผีหนุ่มผู้ไม่มีพลังวิเศษใดๆมีอาชีพหลอกชาวบ้านเพื่อหาเงิน{" "}
            <br />
            ถูกชายลึกลับเชิญตัวไปแบบไม่ตั้งใจ เมื่อเข้ามาถึงภฤหาสต์ใหญ่หลังหนึ่ง{" "}
            <br />
            กลับพบกับสิ่งมีชีวิตปริศนาทำให้เขาต้องเผชิญกับอันตราย <br />
            และหาทางมีชีวิตรอดกลับออกมาให้ได้
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
