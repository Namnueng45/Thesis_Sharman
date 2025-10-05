import "./home.css";
import { useEffect, useState, useRef } from "react"; // เพิ่ม useRef
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgsection1 from "../assets/section1.jpg";
import styles from "./Character.module.css";
import { motion, AnimatePresence } from "framer-motion";
// import AOS from "aos";
// import "aos/dist/aos.css";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeChar, setActiveChar] = useState("kla");
  const [selectedImage, setSelectedImage] = useState(null);
  const arrowRef = useRef(null); // 👈 1. สร้าง ref สำหรับลูกศร

  // Parallax Effect สำหรับ Hero Section - เหมือน CodePen
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".pin-container", // 🎯 Trigger คือคอนเทนเนอร์ตัวนอก
        pin: ".parallax-section", // 📌 Pin คือ section ที่อยู่ข้างใน
        start: "top top",
        end: "bottom bottom", // 🏁 จบเมื่อเลื่อนจนสุดคอนเทนเนอร์
        scrub: 1.2,
        pinSpacing: false, // ❌ **สำคัญมาก:** ปิด pinSpacing เพราะเราจัดการพื้นที่เองแล้ว
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
        opacity: 1, // ทำให้ทึบแสง 100% เมื่อ scroll ถึงสุด
        ease: "none",
      },
      0
    );

    gsap.to(".shamanlogo", {
      // 🎯 สั่งให้แอนิเมชันทำงานกับโลโก้โดยตรง (ไม่ใช่ผ่าน tl)
      scrollTrigger: {
        trigger: ".parallax-section", // 📍 ยังคงอ้างอิง section เดิมเป็นหลัก
        start: "bottom bottom",
        end: "bottom top",
        scrub: 1,
      },
      opacity: 0, // 👻 ทำให้มันโปร่งใส (จางหายไป)
      // y: -100, // (ลูกเล่นเสริม) ทำให้มันเลื่อนขึ้นนิดๆ ตอนจางหาย
      ease: "power1.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  //ตัวข้อความ The Animation im....Movie
  useEffect(() => {
    gsap.to(
      // 🎯 เป้าหมายยังคงเป็น 3 ตัวเหมือนเดิม
      [".content_hero p"],
      {
        scrollTrigger: {
          trigger: ".parallax-section",
          start: "bottom 70%",
          end: "center 60%",
          // markers: true,
          scrub: 1,
        },
        y: -150, // เลื่อนขึ้น
        opacity: 0, // จางหาย
        ease: "none", // ทำให้ความเร็วคงที่ตามการเลื่อน
      }
    );
  }, []);

  //Button ดูภาพยนต์
  useEffect(() => {
    gsap.to([".canvas_hero button"], {
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "bottom 60%",
        end: "center 60%",
        scrub: true,
      },
      y: -150,
      opacity: 0,
      ease: "none",
    });
  }, []);

  // โลโก้ 3D tilt effect ขยับ
  useEffect(() => {
    const handleLogoMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setTilt({ x, y });

      // ==========================================================
      // 🌟 โค้ดใหม่ที่แก้ไขแล้ว ไม่ไหลไปเรื่อยๆ
      // ==========================================================

      // 🌳 1. ทำให้ต้นไม้ขยับตามเมาส์
      // เราจะใช้ gsap.to เพื่อให้ยังมีความนุ่มนวลอยู่
      gsap.to(".parallax-tree-left, .parallax-tree-right", {
        xPercent: x * 0.2, // 💥 เปลี่ยนเป็น xPercent และปรับตัวคูณตามความเหมาะสม
        yPercent: y * 0.2, // 💥 เปลี่ยนเป็น yPercent
        duration: 0.5, // ใส่ duration เพื่อความนุ่มนวล
        ease: "power1.out",
        overwrite: "auto", // 💡 คำสั่งสำคัญ: ยกเลิกแอนิเมชันเก่าก่อนเริ่มอันใหม่
      });

      // 🏠 2. ทำให้บ้านขยับตรงข้ามกับเมาส์
      gsap.to(".parallax-house", {
        xPercent: -x * 0.1, // 💥 ลดตัวคูณของ x ลงเยอะๆ (ให้น้อยกว่า 0.2 ของต้นไม้)
        yPercent: -y * 0.02,
        duration: 0.5,
        ease: "power1.out",
        overwrite: "auto",
      });

      gsap.to(".synopsis-tree", {
        xPercent: x * 0.1, // ขยับตามเมาส์เล็กน้อย (ตัวคูณน้อยๆ)
        yPercent: y * 0.1,
        duration: 0.5, // ความนุ่มนวล
        ease: "power1.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleLogoMouseMove);
    return () => window.removeEventListener("mousemove", handleLogoMouseMove);
  }, []);

  // useEffect(() => {
  //   gsap.to(".synopsis-tree", {
  //     scrollTrigger: {
  //       trigger: ".synopsisSS",
  //       start: "top center",
  //       end: "bottom center",
  //       scrub: true,
  //     },
  //     y: -200,
  //     ease: "none",
  //   });
  // }, []); // [] ทำงานแค่ครั้งเดียวตอนโหลด

  // ✨ useEffect ใหม่: สำหรับเรื่องย่อ ใช้ Timeline ควบคุมทั้งขาเข้าและขาออก
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".content_summary",
          start: "top 60%",
          end: "bottom 30%",
          scrub: 2.5,
        },
      });

      // --- แอนิเมชัน "ขาเข้า" ---
      tl.from([".content_text1", ".content_text2", ".content_text3"], {
        opacity: 0,
        y: 70,
        ease: "power3.out",
        stagger: 0.5,
      });

      // --- แอนิเมชัน "ขาออก" ---
      tl.to(
        [".content_text1", ".content_text2", ".content_text3"],
        {
          opacity: 0,
          y: -50,
          ease: "power2.in",
          stagger: 0.3,
        },
        "+=0.5" // 👈 ขาออกยังคงมี delay ไว้ได้ เพื่อให้มีช่วงที่ข้อความแสดงเต็มๆ
      );
    });
    return () => ctx.revert();
  }, []);

  // ✨ useEffect สำหรับมีด (Parallax + Rotate)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".content_summary",
          start: "top 50%",
          end: "bottom 45%",
          scrub: 1.5,
          // markers: true,
        },
      });

      // สร้างตัวแปร duration เพื่อให้ปรับแก้ได้ง่าย
      const animDuration = 200; // 👈 ลองใช้ค่าที่มากขึ้น เช่น 2

      // --- แอนิเมชัน "ขาเข้า" ---
      tl.from(
        ".knight_knife",
        {
          y: "100vh",
          rotation: -360,
          opacity: 0,
          ease: "power2.out",
          duration: animDuration, // 💥 เพิ่ม duration เข้าไป
        },
        "+=1"
      );

      // --- แอนิเมชัน "ขาออก" ---
      tl.to(
        ".knight_knife",
        {
          y: "-100vh",
          opacity: 0,
          rotation: 360,
          ease: "power1.in",
          duration: animDuration, // 💥 เพิ่ม duration เข้าไป
        },
        "+=1"
      );
    });
    return () => ctx.revert();
  }, []);

  //เก็บข้อมูลตัวละคร character
  const characters = {
    kla: {
      name: "กล้า",
      description: (
        <>
          Lorem ipsum dolor sit amet, consecte <br />
          adipiscing elit. Sed lacinia orci at <br />
          mollis, nec faucibus velit elementum.
          <br /> Quisque fringilla sem at elit hererit,
          <br /> efficitur pulvinar lorem scelerisque.
          <br /> Donec sed consequat sem. magna
          <br /> est, elementum et lorem id,
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
          Lorem ipsum dolor sit amet, consecte <br />
          adipiscing elit. Sed lacinia orci at <br />
          mollis, nec faucibus velit elementum.
          <br /> Quisque fringilla sem at elit hererit,
          <br /> efficitur pulvinar lorem scelerisque.
          <br /> Donec sed consequat sem. magna
          <br /> est, elementum et lorem id,
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
          Lorem ipsum dolor sit amet, consecte <br />
          adipiscing elit. Sed lacinia orci at <br />
          mollis, nec faucibus velit elementum.
          <br /> Quisque fringilla sem at elit hererit,
          <br /> efficitur pulvinar lorem scelerisque.
          <br /> Donec sed consequat sem. magna
          <br /> est, elementum et lorem id,
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
          Lorem ipsum dolor sit amet, consecte <br />
          adipiscing elit. Sed lacinia orci at <br />
          mollis, nec faucibus velit elementum.
          <br /> Quisque fringilla sem at elit hererit,
          <br /> efficitur pulvinar lorem scelerisque.
          <br /> Donec sed consequat sem. magna
          <br /> est, elementum et lorem id,
        </>
      ),
      image: "/img/parallax/guardCharactor.png",
      icon: "/img/parallax/iconchar1.png",
      className: styles.char4,
    },
  };

  // ✨ useEffect ใหม่: สำหรับแอนิเมชันลูกศรเลือกตัวละคร
  useEffect(() => {
    // 2. หา index ของตัวละครที่ถูกเลือก (0, 1, 2, ...)
    const charIndex = Object.keys(characters).indexOf(activeChar);

    // 3. คำนวณตำแหน่ง top ใหม่
    // (ความสูงไอคอน 6vw + gap 1.2vw) * index  -> ได้ตำแหน่งขอบบนของไอคอน
    // บวกด้วยครึ่งหนึ่งของความสูงไอคอน (3vw) -> เพื่อให้ลูกศรอยู่กึ่งกลาง
    const newTopPosition = charIndex * 7.2 + 3;

    // 4. สร้างแอนิเมชันด้วย GSAP Timeline
    const tl = gsap.timeline();
    tl.to(arrowRef.current, {
      // เฟดลูกศรหายไป
      duration: 0.2,
      opacity: 0,
      ease: "power2.in",
    })
      .set(arrowRef.current, {
        // ย้ายตำแหน่งทันทีตอนที่มองไม่เห็น
        top: `${newTopPosition}vw`,
      })
      .to(arrowRef.current, {
        // เฟดลูกศรปรากฏขึ้นมาที่ตำแหน่งใหม่
        duration: 0.2,
        opacity: 1,
        ease: "power2.out",
      });
  }, [activeChar]); // 5. ให้ useEffect นี้ทำงาน "ทุกครั้งที่" activeChar เปลี่ยน

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main_section", // 👈 เปลี่ยนกลับเป็น trigger เดิมที่ใช้
          start: "top 60%", // เริ่มอนิเมชันเมื่อถึงจุดนี้
          end: "center top", // สิ้นสุดอนิเมชันเมื่อ main_section ออกจาก viewport
          scrub: 1.5,
          // markers: true,
        },
      });

      // สร้างตัวแปรความยาวของอนิเมชัน (ใน Timeline)
      const animScrollLength = 0.5; // 👈 ใช้ค่าที่น้อยเพื่อให้อนิเมชันรวดเร็ว/กระชับ

      // --- 1. แอนิเมชัน "ขาเข้า" (จากล่าง-หาย เข้าสู่ตำแหน่งปกติ) ---
      // from: เริ่มจากค่าที่กำหนด ไปยังค่าปกติ (y: 0, opacity: 1)
      tl.from(
        ".Head_storytext",
        {
          y: 100, // เริ่มจากต่ำลงมา 100px
          opacity: 0, // เริ่มจากโปร่งใส
          ease: "power3.out",
          duration: animScrollLength,
        },
        0 // 👈 เริ่มต้น Timeline ที่ตำแหน่ง 0
      );

      // --- 2. แอนิเมชัน "ขาออก" (จากตำแหน่งปกติ ไปสู่บน-หาย) ---
      // to: จากค่าปกติ ไปยังค่าที่กำหนด (y: -100, opacity: 0)
      tl.to(
        ".Head_storytext",
        {
          y: -100, // เลื่อนขึ้นไปข้างบน 100px
          opacity: 0, // จางหายไป
          ease: "power2.in",
          duration: animScrollLength,
        }
        // ตำแหน่ง: เริ่มทันทีหลังจากอนิเมชันแรกจบ
        // 👈 ใส่ดีเลย์เล็กน้อย หรือ ใช้ตำแหน่งอื่น เช่น `1`
      );
    });

    return () => ctx.revert();
  }, []);

  //icon_arrow
  useEffect(() => {
    // 💡 ไม่ต้องใช้ AOS.init() ซ้ำๆ ใน Home component (ควรทำใน _app.js)
    // แต่เราจะใช้ GSAP แทน

    const ctx = gsap.context(() => {
      const targetElement = arrowRef.current;
      if (!targetElement) return;

      // 💡 ตั้งค่า 3D Perspective และ Backface Visibility
      gsap.set(targetElement, {
        transformPerspective: 800,
        backfaceVisibility: "hidden",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main_section",
          start: "top 60%", // เริ่ม Flip เข้า
          end: "center top", // จบ Flip ออก
          scrub: 1.5,
          // markers: true,
        },
      });

      const animScrollLength = 0.5;
      const restTime = 0.2;

      // --- 1. Flip เข้า (Flip-in) ---
      tl.from(
        targetElement,
        {
          opacity: 0,
          rotationY: 180, // พลิกจาก 180 องศามาที่ 0
          ease: "power3.out",
          duration: animScrollLength,
        },
        0
      );

      // --- 2. Flip ออก (Flip-out) ---
      tl.to(
        targetElement,
        {
          opacity: 0,
          rotationY: "+=180", // พลิกต่ออีก 180 องศาพร้อมจางหาย
          ease: "power2.in",
          duration: animScrollLength,
        },
        `+=${animScrollLength + restTime}`
      );
    });

    return () => ctx.revert();
    // 💡 ต้องใส่ [arrowRef] ใน Dependency Array เพื่อให้แน่ใจว่า GSAP สร้าง Timeline เมื่อ ref ถูกผูกกับ Element
  }, [arrowRef]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targetElement = arrowRef.current;
      if (!targetElement) return;

      // 💡 FIX: ใช้ gsap.set() เพื่อบังคับให้ Element อยู่ในสถานะเริ่มต้น
      // (หายไปและเลื่อนไปทางซ้าย) ทันทีที่โหลด
      gsap.set(targetElement, {
        opacity: 0,
        x: -50,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main_section",
          start: "top 40%",
          end: "80% 60%",
          scrub: true,
          markers: true,
        },
      });

      const fastDuration = 0.15;

      tl.to(targetElement, {
        opacity: 1,
        x: 0,
        ease: "power2.out",
      });
      tl.to(targetElement, {
        opacity: 0,
        x: -50,
        ease: "power2.in",
        duration: fastDuration,
      });
    });

    return () => ctx.revert();
  }, [arrowRef]);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 30;
    const y = (e.clientY / innerHeight - 0.5) * 30;
    setTilt({ x, y });
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
      <div className="pin-container">
        <section
          className="parallax-section relative overflow-hidden"
          style={{ height: "100vh", width: "100%" }}
        >
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
            className="absolute bottom-[2vw] right-[-0.7vw] z-50 w-[36vw] parallax-tree-right filter brightness-0" // แก้ไข: เปลี่ยน z-30 เป็น z-50
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
              className="shamanlogo w-[45vw] mb-[2vw] mt-[-3vw]"
              style={{
                transform: `perspective(1000px) rotateY(${
                  tilt.x
                }deg) rotateX(${-tilt.y}deg)`,
                transition: "transform 0.1s ease-out",
              }}
            />
            <div className="content_hero text-center text-white tracking-widest">
              <p
                className="p_content mb-2 text-[1.5vw]"
                style={{ fontFamily: '"iannnnn-OWL' }}
              >
                THE ANIMATION INTERACTIVE MOVIE
              </p>
            </div>
            <button className="mt-[1.5vw] tracking-widest border-2 border-white p-3 px-20 text-white rounded-lg text-lg font-bold transition-all duration-500 ease-in-out hover:bg-[#C23213] hover:text-black hover:border-transparent">
              ดูภาพยนต์
            </button>
          </div>
        </section>
      </div>
      {/* เพิ่ม: Section สีดำสำหรับคั่นหน้า */}
      <section className="canvasblack1 relative z-20 h-[20vh] bg-black" />

      {/* Story Section */}
      <section
        id="synopsis"
        className="synopsisSS relative h-[65vw] flex items-center"
      >
        <div
          className="absolute w-[102%] h-[65vw] z-10 bg-cover bg-center brightness-70 blur-[4px] top-0 left-[-10px]"
          style={{ backgroundImage: `url(${bgsection1})` }}
        ></div>
        <img
          src="/img/parallax/tre3.png"
          alt="tree"
          className="synopsis-tree absolute bottom-[-6vw] right-[-2vw] z-10 w-[55%] filter brightness-0 blur-[6px]"
        />
        <img
          src="/img/parallax/kniight2.png"
          alt="knight"
          className="absolute left-[5vw] z-20 w-[10%] blur-[1.5px] knight_knife"
        />

        {/* overlay บนล่าง และมี backdrop */}
        <div className="overlayupper absolute z-30 top-[-2.5vw] left-0 w-full h-[18vw] bg-gradient-to-b from-black/100 via-black/70 to-transparent"></div>
        <div className="overlayupper absolute z-30 bottom-[-5px] left-0 w-full h-[18vw] bg-gradient-to-t from-black/100 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-[#070D07]/50 pointer-events-none z-20"></div>

        <div className="content_summary absolute w-[100%] z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="content_text1 text-center text-[1.4vw] font-normal leading-[3.3vw] tracking-[0.2vw] text-white">
            “กล้า ชายหนุ่มธรรมดา ที่ใช้ชีวิตในนามหมอผี แต่กลับไร้พลังวิเศษใดๆ{" "}
            <br />
            วันหนึ่งเขาถูกบุคคลลึกลับ เชิญไปยังคฤหาสน์ปริศนาอย่างไม่เต็มใจ{" "}
            <br />
            ที่นั่น
            เขาต้องเผชิญหน้ากับสิ่งที่ครั้งหนึ่งเคยใช้เป็นเพียงเครื่องมือหากิน{" "}
          </p>
          <p className="content_text2 text-center text-[1.4vw] font-normal leading-[3.3vw] tracking-[0.2vw] text-white">
            ทว่าความสยองที่รออยู่กลับเกินกว่าที่เขาจะจินตนาการ <br />
            กล้าจะต้องหาทางผ่านอุปสรรคต่างและเอาชีวิตรอดกลับออกมาให้ได้ <br />
            เขาถูกบังคับให้เผชิญหน้ากับอันตรายที่ไม่อาจคาดคิด
          </p>
          <p className="content_text3 text-center text-[1.4vw] font-normal leading-[3.3vw] tracking-[0.2vw] text-white">
            ทุกการตัดสินใจคือเส้นแบ่งระหว่างความเป็นและความตาย <br />
            และความลับในคฤหาสน์อาจกลายเป็นฝันร้ายที่ไม่มีวันตื่น”
          </p>
        </div>
      </section>

      {/* Black Spacer */}
      <section className="relative h-[10vw] flex items-start z-12 bg-black">
        <div className="absolute z-11 bottom-0 left-0 w-full h-50 bg-gradient-to-t from-black/100 via-black/50 to-transparent"></div>
      </section>

      {/* Character Section */}
      <section
        id="characters"
        className="section_character relative h-[50vw] flex items-start"
        onMouseMove={handleMouseMove}
      >
        {/* พื้นหลัง */}
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
            <div className="relative flex flex-col gap-[1.2vw]">
              <img
                ref={arrowRef} // 👈 4. ผูก ref กับลูกศร
                src="/img/parallax/arrowselected.png"
                alt="selector arrow"
                className="icon_arrow absolute left-[-6.5vw] top-0 w-[6vw] transition-all duration-300"
                style={{ transform: "translateY(-50%)" }} // จัดกึ่งกลางแนวตั้ง
              />
              {Object.keys(characters).map((key) => (
                <img
                  key={key}
                  src={characters[key].icon}
                  alt={characters[key].name}
                  className={`selectorChar w-[6vw] h-[6vw] cursor-pointer transition-all duration-300 object-cover
        ${
          activeChar === key
            ? "opacity-100 scale-105 border-red-500 rounded-[360px]"
            : "opacity-30 hover:opacity-70 rounded-[360px]"
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
