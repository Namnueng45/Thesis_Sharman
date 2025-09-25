import "./home.css";
import { useEffect, useState, useRef } from "react"; // เพิ่ม useRef
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgsection1 from "../assets/section1.jpg";
import styles from "./Character.module.css";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeChar, setActiveChar] = useState("kla");
  const [selectedImage, setSelectedImage] = useState(null);

  // Parallax Effect สำหรับ Hero Section - เหมือน CodePen
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "top top",
        end: "200% top", // ขยายเวลา scroll ให้นานขึ้น
        scrub: 1.2, // ความนุ่มนวลของการเลื่อน
        pin: true, // ล็อค section ไว้
        pinSpacing: true,
      },
    });

    // พื้นหลังขยายและเคลื่อนที่เข้ามา (ซูมเข้า)
    tl.to(
      ".parallax-bg",
      {
        scale: 2, // ขยายใหญ่ขึ้นเพื่อให้รู้สึกเดินเข้าไป
        y: -150,
        transformOrigin: "center center",
        ease: "none",
      },
      0
    );

    // บ้านขยายเข้ามาใกล้ (ซูมเข้า)
    tl.to(
      ".parallax-house",
      {
        scale: 1.5, // ขยายบ้านให้ใหญ่ขึ้น
        y: -100,
        x: -50,
        ease: "none",
      },
      0
    );

    // ต้นไม้ซ้าย - ขยายมากและเลื่อนออกจากจอ (เหมือนเดินผ่านต้นไม้)
    tl.to(
      ".parallax-tree-left",
      {
        scale: 4, // แก้ไข: เพิ่มขนาด scale ให้ใหญ่ขึ้น
        x: -600, // แก้ไข: เพิ่มระยะการเลื่อนออกไปทางซ้าย
        y: -250, // แก้ไข: เพิ่มระยะการเลื่อนขึ้น
        ease: "none",
      },
      0
    );

    // ต้นไม้ขวา - ขยายมากและเลื่อนออกจากจอ (เหมือนเดินผ่านต้นไม้)
    tl.to(
      ".parallax-tree-right",
      {
        scale: 4, // แก้ไข: เพิ่มขนาด scale ให้ใหญ่ขึ้น
        x: 600, // แก้ไข: เพิ่มระยะการเลื่อนออกไปทางขวา
        y: -250, // แก้ไข: เพิ่มระยะการเลื่อนขึ้น
        ease: "none",
      },
      0
    );

    // เพิ่ม: อนิเมชันสำหรับพื้นให้เลื่อนลง
    tl.to(
      ".parallax-ground",
      {
        y: 50, // ทำให้พื้นเลื่อนลงด้านล่าง
        ease: "none",
      },
      0
    );

    // เพิ่ม: อนิเมชันสำหรับทำให้ Overlay ค่อยๆ ทึบแสง
    tl.to(
      ".black-fade-overlay",
      {
        opacity: 0.75, // ทำให้ทึบแสง 100% เมื่อ scroll ถึงสุด
        ease: "none",
      },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Mouse movement effect สำหรับต้นไม้ - เบาลง
  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     const x = (e.clientX / window.innerWidth - 0.5) * 10; // ลดแรงลง
  //     const y = (e.clientY / window.innerHeight - 0.5) * 10;

  //     setTilt({ x, y });

  //     // เอฟเฟกต์ mouse parallax เบาๆ สำหรับต้นไม้
  //     const treeLeft = document.querySelector(".parallax-tree-left");
  //     if (treeLeft) {
  //       gsap.to(treeLeft, {
  //         duration: 0.8,
  //         x: `+=${x / 8}`, // ลดความแรงลง
  //         y: `+=${y / 12}`,
  //         ease: "power2.out",
  //       });
  //     }

  //     const treeRight = document.querySelector(".parallax-tree-right");
  //     if (treeRight) {
  //       gsap.to(treeRight, {
  //         duration: 0.8,
  //         x: `+=${-x / 8}`, // ลดความแรงลง
  //         y: `+=${y / 12}`,
  //         ease: "power2.out",
  //       });
  //     }
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => window.removeEventListener("mousemove", handleMouseMove);
  // }, []);

  // โลโก้ 3D tilt effect

  useEffect(() => {
    const handleLogoMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setTilt({ x, y });
    };

    window.addEventListener("mousemove", handleLogoMouseMove);
    return () => window.removeEventListener("mousemove", handleLogoMouseMove);
  }, []);

  // Character data
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
      className: styles.kla,
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
      className: styles.char3,
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
      className: styles.bodyguard,
    },
    char4: {
      name: "วิญญาณปริศนา",
      description: (
        <>
          วิญญาณปริศนา ที่คอยปรากฏอยู่ในคฤหาสต์ <br /> ไม่ทราบที่มา...
        </>
      ),
      image: "/img/parallax/guardCharactor.png",
      icon: "/img/parallax/iconchar1.png",
      className: styles.char4,
    },
  };

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 30;
    const y = (e.clientY / innerHeight - 0.5) * 30;
    setTilt({ x, y });
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const images = [
    "/img/parallax/screen1.png",
    "/img/parallax/screen2.png",
    "/img/parallax/screen3.png",
  ];

  return (
    <>
      <nav className="absolute z-100 flex flex-wrap justify-between p-6 pr-14 w-[100%]">
        <ul
          className="navbar flex flex-1 justify-between items-center text-[1.1vw]"
          style={{ fontFamily: '"iannnnn-OWL', fontWeight: "bold" }}
        >
          <li>
            <div className="logosvg">
              <img src="/img/logo/sharmanLogo.svg" alt="logosharman" />
            </div>
          </li>
          <li>
            <a
              href="#synopsis"
              className="text-white hover:text-[#C23213] transition-colors"
            >
              STORY
            </a>
          </li>
          <li>
            <a
              href="#characters"
              className="text-white hover:text-[#C23213] transition-colors"
            >
              CHARACTER
            </a>
          </li>
          <li>
            <a
              href="#trailer"
              className="text-white hover:text-[#C23213] transition-colors"
            >
              MOVIE
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              className="text-white hover:text-[#C23213] transition-colors"
            >
              SCREENSHORT
            </a>
          </li>
          <li>
            <a
              href="#results"
              className="text-white hover:text-[#C23213] transition-colors"
            >
              RESULT
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero Section with Parallax */}
      <section className="parallax-section relative h-screen overflow-hidden">
        {/* Background Layer - เลื่อนช้าที่สุด */}
        <div
          className="absolute w-[110%] h-[110%] z-10 bg-cover bg-center brightness-70 parallax-bg"
          style={{
            backgroundImage: `url(${bgsection1})`,
            left: "-5%",
            top: "-5%",
          }}
        ></div>
        {/* House Layer - ตำแหน่งขวา 2/7 ของจอ */}
        <img
          src="/img/parallax/Homesick.png"
          alt="house"
          className="absolute bottom-0 right-2/7 -translate-x-1/2 z-20 w-[56vw] parallax-house"
        />
        {/* Tree Left - เลื่อนเร็วที่สุด */}
        <img
          src="/img/parallax/tre1.png"
          alt="tree"
          className="absolute bottom-[6.5vw] left-[-5vw] z-50 w-[48vw] parallax-tree-left filter brightness-0" // แก้ไข: เปลี่ยน z-30 เป็น z-50
        />
        {/* Tree Right - เลื่อนเร็วที่สุด */}
        <img
          src="/img/parallax/tre3.png"
          alt="tree"
          className="absolute bottom-[2vw] right-[-0.4vw] z-50 w-[36vw] parallax-tree-right filter brightness-0" // แก้ไข: เปลี่ยน z-30 เป็น z-50
        />
        {/* Ground Layer */}
        <img
          src="/img/parallax/ground.png"
          alt="ground"
          className="absolute bottom-0 left-0 w-full brightness-0 z-35 parallax-ground pointer-events-none"
        />

        {/* เพิ่ม: Overlay สีดำสำหรับทำให้มืดตอน scroll */}
        <div className="absolute inset-0 bg-black z-41 black-fade-overlay opacity-0"></div>
        {/* Overlays */}
        <div className="absolute z-40 top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-[#070D07]/30 pointer-events-none z-25"></div>

        {/* Hero Content */}
        <div className="canvas_hero relative z-42 flex flex-col items-center justify-center h-screen">
          {" "}
          {/* แก้ไข: เปลี่ยน z-50 เป็น z-25 */}
          <img
            src="/img/logo/logogo.png"
            alt="logosharman"
            className="shamanlogo w-[45vw] mb-4 mt-[-3vw] ผ"
            style={{
              transform: `perspective(1000px) rotateY(${
                tilt.x
              }deg) rotateX(${-tilt.y}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          />
          <div className="content_hero text-center text-white tracking-widest">
            <p
              className="mb-2 text-[1.5vw]"
              style={{ fontFamily: '"iannnnn-OWL' }}
            >
              THE ANIMATION INTERACTIVE MOVIE
            </p>
          </div>
          <button className="mt-8 tracking-widest border-2 border-white p-3 px-20 text-white rounded-lg text-lg font-bold transition-all duration-500 ease-in-out hover:bg-[#C23213] hover:text-black hover:border-transparent">
            ดูภาพยนต์
          </button>
        </div>
      </section>

      {/* เพิ่ม: Section สีดำสำหรับคั่นหน้า */}
      <section className="relative z-20 h-[20vh] bg-black -mt-1" />

      {/* Story Section */}
      <section id="synopsis" className="relative h-[65vw] flex items-center">
        <div
          className="absolute w-[102%] h-[65vw] z-10 bg-cover bg-center brightness-70 blur-[4px] top-0 left-[-10px]"
          style={{ backgroundImage: `url(${bgsection1})` }}
        ></div>

        <img
          src="/img/parallax/tre3.png"
          alt="tree"
          className="absolute bottom-[0vw] right-[0vw] z-10 w-[55%] filter brightness-0 blur-[6px]"
        />

        <div className="overlayupper absolute z-32 top-[-2.5vw] left-0 w-full h-[22vw] bg-gradient-to-b from-black/100 via-black/70 to-transparent"></div>
        <div className="overlayupper absolute z-11 bottom-[-5px] left-0 w-full h-30 bg-gradient-to-t from-black/100 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-[#070D07]/50 pointer-events-none z-20"></div>

        <motion.div
          className="content_summary absolute text-start pl-[12vw] z-20 text-white"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2
            className="Head_storytext text-[128px] text-[#C23213] font-light"
            style={{ fontFamily: '"MAX somsin", sans-serif' }}
            variants={itemVariants}
          >
            เรื่องย่อ
          </motion.h2>

          <motion.p
            className="content_text text-[20px] font-normal leading-9 tracking-[0.13vw] mt-[-25px]"
            variants={itemVariants}
          >
            เรื่องราวของหมอผีหนุ่มผู้ไม่มีพลังวิเศษใดๆมีอาชีพหลอกชาวบ้านเพื่อหาเงิน
            <br />
            ถูกชายลึกลับเชิญตัวไปแบบไม่ตั้งใจ เมื่อเข้ามาถึงภฤหาสต์ใหญ่หลังหนึ่ง
            <br />
            กลับพบกับสิ่งมีชีวิตปริศนาทำให้เขาต้องเผชิญกับ
            <span className="dagerousP pl-1 text-2xl text-[#D52E0A] font-bold">
              อันตราย
            </span>
            <br />
            และหาทางมีชีวิตรอดกลับออกมาให้ได้
          </motion.p>
        </motion.div>
      </section>
      {/* Black Spacer */}
      <section className="relative h-[10vw] flex items-start z-12 bg-black">
        <div className="absolute z-11 bottom-0 left-0 w-full h-50 bg-gradient-to-t from-black/100 via-black/50 to-transparent"></div>
      </section>
      {/* Character Section */}
      <section
        id="characters"
        className="relative h-[50vw] flex items-start"
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute w-[102vw] h-[55vw] z-10 bg-cover bg-center brightness-40 blur-[3px] top-0 left-[-10px]"
          style={{ backgroundImage: "url('/img/parallax/section3.jpg')" }}
        ></div>

        <div className="overlayupper absolute z-11 top-0 left-0 w-full h-50 bg-gradient-to-b from-black/100 via-black/50 to-transparent"></div>
        <div className="absolute z-11 bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/100 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-[#070D07]/50 pointer-events-none z-20"></div>

        <div className="main_section absolute text-start z-20 text-white top-[6vw] left-[20vw]">
          <h2
            className="Head_storytext text-[128px] text-[#C23213] font-light"
            style={{ fontFamily: '"MAX somsin", sans-serif' }}
          >
            ตัวละคร
          </h2>
          <div className="flex gap-[4vw]">
            <div className="flex flex-col gap-[2.2vw]">
              {Object.keys(characters).map((key) => (
                <img
                  key={key}
                  src={characters[key].icon}
                  alt={characters[key].name}
                  className={`selectorChar w-[10vw] cursor-pointer transition-all duration-300 
        ${
          activeChar === key
            ? "opacity-100 scale-105 border-red-500 rounded-md"
            : "opacity-30 hover:opacity-70"
        }`}
                  onClick={() => setActiveChar(key)}
                  style={{ outline: "none" }}
                />
              ))}
            </div>

            <div className="relative flex flex-col">
              <h3
                className="Head_name text-[90px] text-white font-light mb-[-10px] mt-[-2vw]"
                style={{ fontFamily: '"MAX somsin", sans-serif' }}
              >
                {characters[activeChar].name}
              </h3>
              <div className="border-b border-[#DCDCDC] w-[20vw] border-[0.5px]"></div>
              <div className="mt-[1.8vw]">
                <p className="content_textChar text-[20px] font-normal leading-10 tracking-[0.14vw]">
                  {characters[activeChar].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-[3vw] left-[75vw] z-20 w-[22vw] h-auto perspective-1000">
          <AnimatePresence mode="wait">
            {activeChar && (
              <motion.div
                key={activeChar}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={styles[activeChar]}
              >
                <div
                  style={{
                    transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <img
                    src={characters[activeChar].image}
                    alt={characters[activeChar].name}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      {/* Rest of the sections remain the same... */}
      {/* Black Spacer */}
      <section className="relative h-[10vw] flex items-start z-12 bg-black">
        <div className="absolute z-11 bottom-0 left-0 w-full h-50 bg-gradient-to-t from-black/100 via-black/50 to-transparent"></div>
      </section>
      {/* Interactive Movie Section */}
      <section
        id="trailer"
        className="relative h-[50vw] flex flex-col items-center justify-center z-12 text-center"
      >
        <div
          className="absolute w-[101vw] h-[50vw] bg-cover bg-center brightness-30 blur-[3px] top-0 left-[-10px]"
          style={{ backgroundImage: "url('/img/parallax/section4.jpg')" }}
        ></div>

        <div className="overlayupper absolute z-11 top-0 left-0 w-full h-50 bg-gradient-to-b from-black/100 via-black/50 to-black/0"></div>
        <div className="absolute z-11 bottom-0 left-0 w-full h-50 bg-gradient-to-t from-black/100 via-black/50 to-black/0"></div>
        <div className="absolute inset-0 bg-[#070D07]/50 pointer-events-none z-20"></div>

        <div className="relative text-[24px] z-20 text-white tracking-[0.2vw] font-light leading-[2vw]">
          <p className="">
            ภาพยนตร์มีเรื่องนี้มีรูปแบบ Interactive <br />
            ผู้ชมจะได้มีส่วนร่วมกำหนดเส้นทางและชะตากรรมของเรื่อง..
          </p>

          <button className="text-[28px] mt-[4vw] mb-[4.5vw] px-[4.5vw] py-[0.8vw] bg-[#C23213] hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300">
            ดูภาพยนต์
          </button>
          <p>ทุกการตัดสินใจที่คุณเลือก...จะเปลี่ยนตอนจบไปตลอดกาล</p>
        </div>
      </section>
      {/* Gallery Section */}
      <section
        id="gallery"
        className="relative h-[50vw] flex flex-col items-center justify-center z-12 text-center bg-black"
      >
        <div className="overlayupper absolute z-11 top-0 left-0 w-full h-50 bg-gradient-to-b from-black/100 via-black/50 to-black/0"></div>
        <div className="absolute z-11 bottom-0 left-0 w-full h-50 bg-gradient-to-t from-black/100 via-black/50 to-black/0"></div>

        <div className="relative text-[20px] z-20 text-white tracking-[0.2vw] font-light">
          <div className="w-[48vw] h-[27vw]">
            <img
              src="/img/parallax/screen1.png"
              alt="main"
              className="w-full h-full object-cover shadow-lg"
            />
          </div>

          <div className="flex gap-[1.5vw] mt-[1.5vw]">
            {images.map((img, i) => (
              <div key={i} className="w-[15vw] h-[6vw]">
                <img
                  src={img}
                  alt={`thumb-${i}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity duration-500 ease-in-out"
                  onClick={() => setSelectedImage(img)}
                />
              </div>
            ))}
          </div>

          {selectedImage && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
              <img
                src={selectedImage}
                alt="full"
                className="max-w-[80vw] max-h-[80vh] rounded-lg object-contain"
              />
              <button
                className="absolute top-8 right-8 text-white text-2xl font-bold"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </section>
      {/* Results Section */}
      <section
        id="results"
        className="relative h-[50vw] flex flex-col items-center justify-center z-12"
      >
        <div
          className="absolute w-[101vw] h-[50vw] bg-cover bg-center brightness-50 blur-[2px] top-0 left-[-10px]"
          style={{ backgroundImage: "url('/img/parallax/section6.jpg')" }}
        ></div>

        <div className="overlayupper absolute z-11 top-0 left-0 w-full h-50 bg-gradient-to-b from-black/100 via-black/50 to-black/0"></div>
        <div className="absolute z-100 bottom-[-1vw] left-0 w-full h-20 bg-gradient-to-t from-black/100 via-black/60 to-black/0"></div>
        <div className="absolute inset-0 bg-[#070D07]/50 pointer-events-none z-20"></div>

        <div className="z-20 tracking-[0.2vw] mt-[1vw] mb-[1.5vw]">
          <h2
            className="Head_storytext text-[128px] text-[#C23213] font-light z-30"
            style={{ fontFamily: '"MAX somsin", sans-serif' }}
          >
            ผลลัพธ์
          </h2>
        </div>

        <div className="z-20 flex flex-col gap-[1.6vw]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-center gap-12">
              <div className="flex flex-row items-center w-[20vw] text-white mt-[-2.5vw] gap-[1.5vw]">
                <p className="text-[0.9vw] leading-relaxed opacity-70 text-right">
                  เนื้อหาของตัวละครตัวที่ {i} อธิบายเรื่องราวสั้น ๆ
                </p>
                <p className="text-[4vw] font-bold mt-[-0.1vw]">
                  {50 + i * 10}%
                </p>
              </div>

              <div className="w-[14vw]">
                <img
                  src="/img/parallax/screen1.png"
                  alt={`character ${i}`}
                  className="shadow-lg h-[7vw] w-[14vw]"
                />
                <p className="mt-[1vw] text-[20px] text-center text-white text-[1vw] tracking-wide">
                  ชื่อตัวละคร {i}
                </p>
              </div>

              <div className="flex flex-row items-center w-[20vw] text-white mt-[-2.5vw] gap-[1.5vw]">
                <p className="text-[4vw] font-bold mt-[-0.1vw]">
                  {60 + i * 10}%
                </p>
                <p className="text-[0.9vw] leading-relaxed opacity-70 text-left">
                  ข้อมูลเสริมของตัวละครตัวที่ {i} อาจจะเป็นพลังหรือคุณสมบัติ
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer className="h-[30vw] bg-black flex justify-center items-center flex-col gap-10">
        <div className="flex justify-center items-center gap-10">
          <img src="/img/parallax/AAD.svg" alt="AAD" className="w-[8%]" />
          <img src="/img/parallax/DMP.svg" alt="DMP" className="w-[8%]" />
          <img src="/img/parallax/logokmit.svg" alt="KMIT" className="w-[8%]" />
        </div>
        <div className="flex justify-center items-center flex-col text-center gap-3">
          <div className="flex justify-center items-center gap-2">
            <img
              src="/img/parallax/ifacebook.svg"
              alt="Facebook"
              className="w-[2.5vw]"
            />
            <img
              src="/img/parallax/iig.svg"
              alt="Instagram"
              className="w-[2.5vw]"
            />
            <img
              src="/img/parallax/isocial.svg"
              alt="Social"
              className="w-[2.5vw]"
            />
            <img
              src="/img/parallax/iemail.svg"
              alt="Email"
              className="w-[2.5vw]"
            />
          </div>
          <p className="text-white">โดย มงคล</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
