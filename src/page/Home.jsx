// 1. React Core
import { useEffect, useState, useRef } from "react";

// 2. Third-Party Libraries (เรียงตามตัวอักษร)
import AOS from "aos";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 3. Internal Components (โค้ดของคุณเอง)
import AnimatedBallsBackground from "../components/AnimatedBall/AnimatedBallsBackground";
import Navbar from "../components/Navbar/index";
import StyledButton from "../components/StyledButton/index";

// 4. Stylesheets
import "aos/dist/aos.css"; // CSS ของ Library
import styles from "./Character.module.css"; // CSS Modules
import "./home.css"; // Global CSS ของคุณ

// 5. Static Assets
import bgsection1 from "../assets/section1.jpg";

gsap.registerPlugin(ScrollTrigger);
const CountingNumber = ({ targetNumber, className, triggerRef }) => {
  const [displayedNumber, setDisplayedNumber] = useState(0);
  // 1. ✅ เพิ่ม Local Ref เพื่อเก็บค่าที่เสถียร
  const currentTriggerRef = useRef(null);

  useEffect(() => {
    // 2. ✅ อัปเดตค่า Ref ภายในทุกครั้งที่ Prop เปลี่ยน
    currentTriggerRef.current = triggerRef.current;
    if (!triggerRef.current) return;

    const counter = { val: 0 };
    let tween;

    const st = ScrollTrigger.create({
      trigger: currentTriggerRef.current,
      start: "0% 80%",

      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: targetNumber,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            setDisplayedNumber(Math.round(counter.val));
          },
        });
      },
    });

    return () => {
      st.kill();
      if (tween) tween.kill();
    };
    // 2. ✅ แก้ไข: ลบ triggerRef ออกจาก Dependency Array เพื่อป้องกันการรันซ้ำ
  }, [targetNumber, triggerRef.current]); // <--- แก้ไขตรงนี้

  // 3. ✅ Return JSX (ต้องอยู่นอก useEffect)
  return <p className={className}>{displayedNumber}%</p>;
};

function Home() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeChar, setActiveChar] = useState("kla");
  const [selectedImage, setSelectedImage] = useState(null);
  const arrowRef = useRef(null); // 👈 1. สร้าง ref สำหรับลูกศร
  const boxesRef = useRef([]);

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
        duration: 0.4,
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

      const animDuration = 200;

      // --- แอนิเมชัน "ขาเข้า" (จากบนลงมา) ---
      tl.from(
        ".knight_knife2", // 👈 [แก้ไข] เปลี่ยนชื่อคลาส
        {
          y: "-80vh", // 👈 [แก้ไข] เปลี่ยนทิศทางให้มาจากข้างบน
          rotation: -360,
          opacity: 0,
          ease: "power2.out",
          duration: animDuration,
        },
        "+=1"
      );

      // --- แอนิเมชัน "ขาออก" (ลงไปข้างล่าง) ---
      tl.to(
        ".knight_knife2", // 👈 [แก้ไข] เปลี่ยนชื่อคลาส
        {
          y: "100vh", // 👈 [แก้ไข] เปลี่ยนทิศทางให้ออกไปข้างล่าง
          opacity: 0,
          rotation: 360,
          ease: "power1.in",
          duration: animDuration,
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
          หมอผีหนุ่มผู้ไรพลังวิเศษใดๆ
          เขาใช้ชีวิตแค่ลองลวงเช้าบ้านไปวันแต่วันนึงกับเจอเรื่องไม่ขาดคิด
          เขาถูกชายลึกลับมาพาตัวไปที่ คฤหาสต์แห่งหนึ่ง
          คฤหาสต์ปริศนาที่เต็มไปด้วยความลับ เจ้าของคฤหาสต์
          แห่งนั้นออกมาต้อนรับอย่างร้อนรน <br />
          ก่อนที่ทั้งคู่จะเจอกับ เรื่องที่ไม่คาดฝัน.
        </>
      ),
      image: "/img/parallax/Char_shaman.png",
      icon: "/img/parallax/icon_shaman.png",
      className: styles.kla,
    },
    owner: {
      name: "ชายสูงวัย",
      description: (
        <>
          ชายสูงวัยลึกลับ อ้วนท่วม หน้าตาใจดีดูเป็นมิตร
          แต่มีนิสัยส่วนตัวที่ชอบของเก่า เขามักจะสะสมของแปลกๆ ไว้ในคฤหาสต์
          ของตนเอง ทำให้คฤหาสต์ของเขาเต็มไปด้วยรูปปั้น งานศิลปะ
          และของสะสมอื่นๆอีกมากมาย อีกทั้งยังมีความลับบางอย่าง
          ที่ซ่อนอยู่ในคฤหาสต์ แห่งนี้.
        </>
      ),
      image: "/img/parallax/Char_owner.png",
      icon: "/img/parallax/icon_owner.png",
      className: styles.owner,
    },
    bodyguard: {
      name: "บอดี้การ์ด",
      description: (
        <p className="text-left break-words">
          บุคคลปริศนาสองคน ที่เป็นคนมาพบกล้าในครั้งแรกทั้งคู่ดูลึกลับ
          และดูเป็นอันตราย พวกเขาเป็นคนพากล้าเดินทางมาที่ คฤหาสต์แห่งนั้น
          ที่ที่เป็นจุดเริ่มต้นของเรื่องราว.
        </p>
      ),
      image: "/img/parallax/Char_bodyguard.png",
      icon: "/img/parallax/icon_bodyguard.png",
      className: styles.bodyguard,
    },
    monster: {
      name: "วิญญาณปริศนา",
      description: (
        <>
          วิญญาณปริศนา ที่ค่อยปรากฏตัวก่อกวนอยู่ในคฤหาสต์แห่งนี้
          บางก็ว่าเป็นผีร้าย บ้างก็ว่าเป็นปีศาจที่น่ากลัว ไม่มีใครรู้ว่ามันมา
          จากไหน และต้องการอะไร แต่มันอาจจะเป็นสิ่งที่กล้าจะต้องพบเจอ.
        </>
      ),
      image: "/img/parallax/Char_monster.png",
      icon: "/img/parallax/icon_monster.png",
      className: styles.monster,
    },
  };

  // ✨ ลูกศรขยับ Importain
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
  }, [activeChar]);

  useEffect(() => {
    AOS.init({
      offset: 300,
      once: false,
    });
  }, []);

  //ข้อความกระตุ้นดูหนัง hook
  useEffect(() => {
    const observers = [];

    boxesRef.current.forEach((box) => {
      if (!box) return;
      const text = box.querySelector(".text");
      if (!text) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // 🌑 ค่อย ๆ โผล่จากกลาง
            gsap.fromTo(
              text,
              { opacity: 0, scale: 0.8 }, // เริ่มเล็กและโปร่ง
              {
                opacity: 1,
                scale: 1,
                duration: 1.4,
                ease: "power2.out", // ค่อย ๆ มา ไม่มีเด้ง
                overwrite: "auto",
              }
            );
          } else {
            // 🌒 ค่อย ๆ จางหายกลับ
            gsap.to(text, {
              opacity: 0,
              scale: 0.9,
              duration: 0.8,
              ease: "power2.inOut",
            });
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(box);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

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
  const galleryRef = useRef(null);

  //ส่วนรูปภาพ fade up
  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
          end: "bottom 20%",
          scrub: false,

          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  const resultItemRefs = useRef([]);

  return (
    <>
      <Navbar />
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
            className="absolute bottom-[5vw] right-1/4 -translate-x-1/2 z-20 w-[60vw] parallax-house"
          />
          {/* Tree Left - เลื่อนเร็วที่สุด */}
          <img
            src="/img/parallax/tre1.png"
            alt="tree"
            className="absolute bottom-[0vw] left-[-8vw] z-50 w-[65vw] parallax-tree-left filter brightness-0 pointer-events-none" // แก้ไข: เปลี่ยน z-30 เป็น z-50
          />
          {/* Tree Right - เลื่อนเร็วที่สุด */}
          <img
            src="/img/parallax/tre4.png"
            alt="tree"
            className="absolute bottom-[-2vw] right-[-1vw] z-50 w-[55vw] parallax-tree-right filter brightness-0 pointer-events-none" // แก้ไข: เปลี่ยน z-30 เป็น z-50
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
              className="shamanlogo w-[45vw] mb-[-1vw] mt-[-4vw]"
              style={{
                transform: `perspective(1000px) rotateY(${
                  tilt.x
                }deg) rotateX(${-tilt.y}deg)`,
                transition: "transform 0.1s ease-out",
              }}
            />
            <div className="content_hero text-center text-white tracking-widest">
              <p
                className="p_content text-[1.5vw]"
                style={{ fontFamily: '"iannnnn-OWL' }}
              >
                THE ANIMATION INTERACTIVE MOVIE
              </p>
            </div>
            <div className="w-[4%] mt-[4vw] arrow-container">
              <img
                src="/img/parallax/arrow1.png"
                alt="arrow"
                className="scrollarrow1"
              />
              <img
                src="/img/parallax/arrow1.png"
                alt="arrow"
                className="scrollarrow1"
              />
              <img
                src="/img/parallax/arrow1.png"
                alt="arrow"
                className="scrollarrow1"
              />
            </div>
          </div>
        </section>
      </div>
      {/* เพิ่ม: Section สีดำสำหรับคั่นหน้า */}
      <section className="canvasblack1 relative z-22 h-[20vh] bg-black" />

      {/* Story Section */}
      <section
        id="synopsis"
        className="synopsisSS relative h-[65vw] flex items-center scroll-target"
      >
        <div
          className="absolute w-[102%] h-[65vw] z-10 bg-cover bg-center brightness-140 blur-[1px] top-0 left-[-10px]"
          // [แก้ไข] เปลี่ยน path ไปยังรูปภาพในโฟลเดอร์ public
          style={{ backgroundImage: `url('/img/parallax/BG_02_Story.png')` }}
        ></div>
        <img
          src="/img/parallax/tre4.png"
          alt="tree"
          className="synopsis-tree absolute bottom-[-6vw] right-[-2vw] z-10 w-[55%] filter brightness-0 blur-[6px]"
        />
        <img
          src="/img/parallax/kniight2.png"
          alt="knight"
          className="absolute left-[5vw] z-18 w-[10%] blur-[1.5px] knight_knife"
        />
        <img
          src="/img/parallax/kniight1.png"
          alt="knight"
          className="absolute right-[5vw] z-10 w-[16%] blur-[1px] knight_knife2"
        />

        {/* overlay บนล่าง และมี backdrop */}
        <div
          id="sYnopsisd"
          className="overlayupper absolute z-30 top-[-2.5vw] left-0 w-full h-[12vw] bg-gradient-to-b from-black/100 via-black/70 to-transparent"
        ></div>
        <div className="overlayupper absolute z-22 bottom-[-5px] left-0 w-full h-[5vw] bg-gradient-to-t from-black/100 via-black/30 to-transparent"></div>
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
      <div id="sYnopsisd"></div>
      {/* Black Spacer */}

      <section className="relative h-[10vw] flex items-start z-12 bg-black"></section>

      {/* Character Section */}
      <section
        id="characters"
        className="section_character relative h-[55vw] flex items-start"
        onMouseMove={handleMouseMove}
      >
        {/* พื้นหลัง */}
        <div
          className="absolute w-[102vw] h-[55vw] z-10 bg-cover bg-center brightness-120 blur-[1px] top-0 left-[-10px]"
          style={{
            backgroundImage: "url('/img/parallax/BG_03_Character.png')",
          }}
        ></div>

        <div className="overlayupper absolute z-21 top-0 left-0 w-full h-50 bg-gradient-to-b from-black/100 via-black/50 to-transparent"></div>
        <div className="absolute z-21 bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/100 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-[#070D07]/50 pointer-events-none z-20"></div>

        <div className="main_section absolute text-start z-22 text-white top-[6vw] left-[20vw]">
          <h2
            className="Head_storytext text-[128px] text-[#C23213] font-light "
            style={{ fontFamily: '"MAX somsin", sans-serif' }}
            data-aos="fade-up" // ใช้ fade
            data-aos-duration="1000" // เวลาของ fade
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
                  // ตรวจสอบให้แน่ใจว่า className สะอาด ไม่มีโค้ดอนิเมชั่นอื่นปนอยู่
                  className={`selectorChar w-[6vw] h-[6vw] cursor-pointer transition-all duration-300 object-cover
      ${
        activeChar === key
          ? "opacity-100 scale-105 border-red-500 rounded-[360px]"
          : "opacity-50 hover:opacity-70 rounded-[360px]"
      }`}
                  onClick={() => setActiveChar(key)}
                  style={{ outline: "none" }}
                />
              ))}
            </div>

            <div className="relative flex flex-col">
              <h3
                className="Head_name text-[4.6vw] text-white font-light mb-[-10px] mt-[-2vw]"
                style={{ fontFamily: '"MAX somsin", sans-serif' }}
                data-aos="fade-up" // ใช้ fade
                data-aos-duration="1500" // เวลาของ fade
                data-aos-offset="300"
              >
                {characters[activeChar].name}
              </h3>
              <div
                className="border-b border-[#DCDCDC] w-[20vw] border-[0.5px]"
                data-aos="flip-right"
                data-aos-duration="1000" // เวลาของ fade
                data-aos-delay="500"
              ></div>
              <div className="mt-[1.8vw] max-w-[21vw]">
                <p
                  className="content_textChar text-[1.05vw] font-normal leading-10 tracking-[0.14vw] font-[20px]"
                  data-aos="fade-up" // ใช้ fade
                  data-aos-anchor-placement="top-bottom"
                  data-aos-delay="400"
                  data-aos-offset="200"
                >
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
                    data-aos="zoom-in"
                    data-aos-offset="680"
                    data-aos-delay="400"
                    data-aos-duration="1000" // เวลาของ fade
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Rest of the sections remain the same... */}
      {/* Black Spacer */}
      <section className="relative h-[20vw] flex items-start z-12 bg-black">
        <div className="absolute z-11 bottom-0 left-0 w-full h-[20vw] bg-gradient-to-t from-black/100 via-black/50 to-transparent"></div>
      </section>

      <section id="movie" className="section_Hook relative overflow-hidden">
        <div className="overlayupper absolute z-21 top-0 left-0 w-full h-50 bg-gradient-to-b from-black/100 via-black/50 to-transparent"></div>
        <div className="absolute z-21 bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/100 via-black/40 to-transparent"></div>
        {/* [เพิ่ม] 2. วาง Component Background เข้าไปเป็นอันแรก */}
        <AnimatedBallsBackground />

        {/* 3. ทำให้ Content อยู่ข้างหน้า Background */}
        <div className="relative z-10">
          {[
            "ภาพยนตร์มีเรื่องนี้ ไม่ใช่แค่การรับชม",
            "คุณจะได้มีส่วนร่วมในกำหนดเส้นทางและชะตากรรมของเรื่อง..",
            "ทุกการตัดสินใจที่คุณเลือก...จะเปลี่ยนตอนจบไปตลอดกาล",
            "ปุ่ม",
          ].map((text, i) => (
            <div
              key={i}
              className="box"
              ref={(el) => (boxesRef.current[i] = el)}
            >
              {text === "ปุ่ม" ? (
                <div className="relative movie-button-wrapper">
                  <StyledButton>รับชมภาพยนตร์</StyledButton>
                </div>
              ) : (
                <div className="text">{text}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="relative h-[20vw] flex items-start z-12 bg-black ">
        <div className="absolute z-[11] top-0 left-0 w-full h-[15vw] bg-gradient-to-b from-black/100 via-black/50 to-transparent"></div>
      </section>

      {/* ดูรูป garally */}
      <section
        id="gallery"
        className="relative h-[50vw] flex flex-col items-center justify-center z-12 text-center bg-black"
      >
        <div className="overlayupper absolute z-22 top-0 left-0 w-full h-50 bg-gradient-to-b from-black/100 via-black/50 to-black/0"></div>
        <div className="absolute z-11 bottom-0 left-0 w-full h-50 bg-gradient-to-t from-black/100 via-black/50 to-black/0"></div>

        <div className="relative text-[20px] z-20 text-white tracking-[0.2vw] font-light">
          <div className="w-[48vw] h-[27vw]">
            <img
              data-aos="fade-up"
              src="/img/parallax/screen1.png"
              alt="main"
              className="w-full h-full object-cover shadow-lg cursor-pointer" // 👈 เพิ่ม cursor-pointer
              onClick={() => setSelectedImage("/img/parallax/screen1.png")} // 👈 เพิ่ม onClick
            />
          </div>

          <div ref={galleryRef} className="flex gap-[1.5vw] mt-[1.5vw]">
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

      <section className="relative h-[14vw] flex items-start z-12 bg-black ">
        <div className="absolute z-[11] top-0 left-0 w-full h-[12vw] bg-gradient-to-b from-black/100 via-black/50 to-transparent"></div>
      </section>

      {/* Results Section */}
      <section
        id="results"
        className="relative h-[50vw] flex flex-col items-center justify-center z-12 scroll-target2"
      >
        <div
          className="absolute w-[101vw] h-[50vw] bg-cover bg-center brightness-100 blur-[1px] top-0 left-[-10px]"
          style={{ backgroundImage: "url('/img/parallax/BG_04_static.png')" }}
        ></div>

        <div className="overlayupper absolute z-22 top-0 left-0 w-full h-[5vw] bg-gradient-to-b from-black/100 via-black/50 to-black/0 "></div>
        <div className="absolute z-22 bottom-[-1vw] left-0 w-full h-20 bg-gradient-to-t from-black/100 via-black/60 to-black/0"></div>
        <div className="absolute inset-0 bg-[#070D07]/50 pointer-events-none z-20"></div>

        <div className="z-23 text-center mt-[-5vw]">
          <div className="tracking-[0.2vw] mt-[1vw] mb-[-1vw] ">
            <h2
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-delay="200"
              data-aos-offset="400"
              className="Head_storytextName text-[128px] text-[#C23213] font-light z-30"
              style={{ fontFamily: '"MAX somsin", sans-serif' }}
            >
              ผลลัพธ์
            </h2>
          </div>

          <div className="z-20 flex flex-col gap-[1.6vw]">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                ref={(el) => (resultItemRefs.current[i] = el)}
                className="flex items-center justify-center gap-12 "
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="200"
              >
                <div className="flex flex-row items-center w-[20vw] text-white mt-[-2.5vw] gap-[1.5vw]">
                  <p className="text-[0.9vw] leading-relaxed opacity-70 text-right">
                    เนื้อหาของตัวละครตัวที่ {i} อธิบายเรื่องราวสั้น ๆ
                  </p>
                  <CountingNumber
                    targetNumber={50 + i * 10}
                    className="text-[4vw] font-bold mt-[-0.1vw]"
                    // ✅ แก้ไข: ดึง Element ตรงๆ จาก Object แทน Array Index (ใช้ i แทน i-1)
                    triggerRef={{ current: resultItemRefs.current[i] }}
                  />
                </div>

                <div className="w-[14vw]">
                  <img
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="200"
                    src="/img/parallax/screen1.png"
                    alt={`character ${i}`}
                    className="shadow-lg h-[7vw] w-[14vw]"
                  />
                  <p className="mt-[1vw] text-[20px] text-center text-white text-[1vw] tracking-wide">
                    ชื่อตัวละคร {i}
                  </p>
                </div>

                <div className="flex flex-row items-center w-[20vw] text-white mt-[-2.5vw] gap-[1.5vw]">
                  <CountingNumber
                    targetNumber={60 + i * 10}
                    className="text-[4vw] font-bold mt-[-0.1vw]"
                    triggerRef={{ current: resultItemRefs.current[i] }} // 💥 FIX 4
                  />
                  <p className="text-[0.9vw] leading-relaxed opacity-70 text-left">
                    ข้อมูลเสริมของตัวละครตัวที่ {i} อาจจะเป็นพลังหรือคุณสมบัติ
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="relative h-[6vw] flex items-start z-12 bg-black ">
        <div className="absolute z-[11] top-0 left-0 w-full h-[6vw] bg-gradient-to-b from-black/100 via-black/50 to-transparent"></div>
      </section> */}

      {/* Footer */}
      <footer className="h-[14vw] bg-black flex justify-center items-center flex-col gap-10">
        <div className="flex justify-center items-center gap-10">
          <img src="/img/parallax/AAD.svg" alt="AAD" className="w-[25%]" />
          <img src="/img/parallax/DMP.svg" alt="DMP" className="w-[25%]" />
          <img
            src="/img/parallax/logokmit.svg"
            alt="KMIT"
            className="w-[25%]"
          />
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
