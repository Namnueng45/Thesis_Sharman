import "./home.css";
import bgsection1 from "../assets/section1.jpg";

function Home() {
  return (
    <section className="relative h-screen">
      {/* Background image and img parallax*/}
      <div
        className="absolute w-[102%] h-full z-0 bg-cover bg-center brightness-70 blur-[5px] top-0 left-[-10px] "
        style={{ backgroundImage: `url(${bgsection1})` }}
      ></div>

      {/* บ้าน */}
      <img
        src="/public/img/parallax/homesick.png"
        alt="house"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-5 w-[60%]"
      />

      {/* ต้นไม้ */}
      <img
        src="/public/img/parallax/tre1.png"
        alt="tree"
        className="absolute bottom-0 left-[15%] z-20"
      />

      {/* ต้นไม้ */}
      <img
        src="/public/img/parallax/tre2.png"
        alt="tree"
        className="absolute bottom-0 left-[15%] z-20"
      />

      {/* พื้น */}
      <img
        src="/public/img/parallax/ground.png"
        alt="ground"
        className="absolute bottom-0 left-0 w-full z-30"
      />

      {/* Overlay gradient ดำ → โปร่งใส */}
      <div className="absolute z-99 top-0 left-0 w-full h-50 bg-gradient-to-b from-black/100 via-black/70 to-transparent"></div>

      {/* Nav อยู่บน background */}
      <nav className="relative z-100 flex flex-wrap justify-between items-center p-6 pr-15">
        <div className="logosvg flex-1">
          <img
            src="/public/img/logo/sharmanLogo.svg"
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
      <div className="relative z-10 flex flex-col items-center justify-center h-[80%] ">
        <img
          src="/public/img/logo/logogo.svg"
          alt="logosharman"
          className="absolute z-100 top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <div className="text-center text-white mt-[300px] tracking-widest">
          <p className="font-[100]">ภาพยนตร์มีเรื่องนี้มีรูปแบบ Interactive</p>
          <p className="font-[100]">
            ผู้ชมจะได้มีส่วนร่วมกำหนดเส้นทางและชะตากรรมของเรื่อง..
          </p>
          <br />
          <p className="font-[100]">
            ทุกการตัดสินใจที่คุณเลือก...จะเปลี่ยนตอนจบไปตลอดกาล
          </p>
        </div>
        <button className="buttonPlay tracking-widest border-2 p-3 mt-15 text-white rounded-lg pl-20 pr-20 text-lg font-bold">
          ดูภาพยนต์
        </button>
      </div>
    </section>
  );
}

export default Home;
