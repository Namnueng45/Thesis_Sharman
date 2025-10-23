// 1. React Core
import { useEffect, useState, useRef } from "react";

// 2. Third-Party Libraries (เรียงตามตัวอักษร)
import AOS from "aos";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@studio-freight/react-lenis";

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

// =================================================================
// Page: Home
// =================================================================
function Home() {
  // --- State Management ---
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeChar, setActiveChar] = useState("kla");
  const [selectedImage, setSelectedImage] = useState(null);

  // --- Refs ---
  const arrowRef = useRef(null);
  const boxesRef = useRef([]);
  const galleryRef = useRef(null);
  const resultItemRefs = useRef([]);

  // =================================================================
  // Initial Setup Effects
  // =================================================================

  // Setup AOS (Animate On Scroll)v
  useEffect(() => {
    AOS.init({
      offset: 300,
      once: false,
    });
  }, []);

  // =================================================================
  // Section: Hero
  // =================================================================

  // Parallax Zoom Effect
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".pin-container",
        pin: ".parallax-section",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        pinSpacing: false,
      },
    });

    tl.to(
      ".parallax-bg",
      {
        scale: 2,
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
        scale: 1.5,
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
        scale: 4,
        x: -600,
        y: -250,
        ease: "none",
      },
      0
    );

    // ต้นไม้ขวา - ขยายมากและเลื่อนออกจากจอ (เหมือนเดินผ่านต้นไม้)
    tl.to(
      ".parallax-tree-right",
      {
        scale: 4,
        x: 600,
        y: -250,
        ease: "none",
      },
      0
    );

    // เพิ่ม: อนิเมชันสำหรับทำให้ Overlay ค่อยๆ ทึบแสง
    tl.to(
      ".black-fade-overlay",
      {
        opacity: 1,
        ease: "none",
        duration: 0.4,
      },
      0
    );

    // Logo and Title Fade Out
    gsap.to(".shamanlogo", {
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "bottom bottom",
        end: "bottom top",
        scrub: 1,
      },
      opacity: 0,
      ease: "power1.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  //ตัวข้อความ The Animation im....Movie
  useEffect(() => {
    gsap.to([".content_hero p"], {
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "bottom 70%",
        end: "center 60%",
        // markers: true,
        scrub: 1,
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

      // 🌳 1. ทำให้ต้นไม้ขยับตามเมาส์
      gsap.to(".parallax-tree-left, .parallax-tree-right", {
        xPercent: x * 0.2,
        yPercent: y * 0.2,
        duration: 0.5,
        ease: "power1.out",
        overwrite: "auto",
      });

      // 🏠 2. ทำให้บ้านขยับตรงข้ามกับเมาส์
      gsap.to(".parallax-house", {
        xPercent: -x * 0.1,
        yPercent: -y * 0.02,
        duration: 0.5,
        ease: "power1.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleLogoMouseMove);
    return () => window.removeEventListener("mousemove", handleLogoMouseMove);
  }, []);

  // =================================================================
  // Section: Story
  // =================================================================

  // ข้อความ p สำหรับเรื่องย่อ ใช้ Timeline ควบคุมทั้งขาเข้าและขาออก
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
        "+=0.5"
      );
    });
    return () => ctx.revert();
  }, []);

  // ✨ useEffect สำหรับitem ซ้าย (Parallax + Rotate)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".content_summary",
          start: "top 50%",
          end: "bottom 45%",
          scrub: 3,
          // markers: true,
        },
      });
      const animDuration = 200;

      // --- แอนิเมชัน "ขาเข้า" ---
      tl.from(
        ".itemStory_left",
        {
          y: "100vh",
          rotation: -360,
          rotationX: 45, // 👈 [เพิ่ม] เอียงไปข้างหน้า 45 องศา (เหมือนกำลังพุ่งลง)
          rotationY: -30, // 👈 [เพิ่ม] เอียงไปทางซ้าย 30 องศา
          opacity: 0,
          ease: "power2.out",
          duration: animDuration, // 💥 เพิ่ม duration เข้าไป
        },
        "+=0.5"
      );

      // --- แอนิเมชัน "ขาออก" ---
      tl.to(
        ".itemStory_left",
        {
          y: "-100vh",
          opacity: 0,
          rotation: 360,
          rotationX: -45,
          rotationY: 30,
          ease: "power1.in",
          duration: animDuration,
        },
        "+=0.5"
      );
    });
    return () => ctx.revert();
  }, []);

  // ✨ useEffect สำหรับitem ขวา (Parallax + Rotate)
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
        ".itemStory_right",
        {
          y: "-80vh",
          rotation: -360,
          opacity: 0,
          ease: "power2.out",
          duration: animDuration,
        },
        "+=1"
      );

      // --- แอนิเมชัน "ขาออก" (ลงไปข้างล่าง) ---
      tl.to(
        ".itemStory_right",
        {
          y: "100vh",
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

  // =================================================================
  // Section: Character
  // =================================================================

  //เก็บข้อมูลตัวละคร character : ชื่อ , คำอธิบาย , styles , รูป
  const characters = {
    kla: {
      name: "กล้า",
      description: (
        <p className="text-left break-words">
          หมอผีหนุ่มผู้ไร้พลังวิเศษใดๆ เขาใช้ชีวิตแค่หลอกลวงชาวบ้านไปวันๆ
          ทว่าวันหนึ่งกลับเจอเรื่องไม่ขาดคิด
          เขาถูกชายลึกลับพาตัวไปยังคฤหาสน์แห่งหนึ่ง
          คฤหาสน์ปริศนาที่เต็มไปด้วยความลับ
          ซึ่งเจ้าของคฤหาสน์ได้ออกมาต้อนรับอย่างรีบร้อน
          ก่อนที่ทั้งคู่จะเจอกับเรื่องที่ไม่คาดฝัน.
        </p>
      ),
      image: "/img/parallax/Char_shaman.png",
      icon: "/img/parallax/icon_shaman.png",
      className: styles.kla,
    },
    owner: {
      name: "ชายสูงวัย",
      description: (
        <p className="text-left break-words">
          ชายสูงวัยลึกลับ รูปร่างท้วม หน้าตาใจดี <br />
          ดูเป็นมิตรเขามีนิสัยชอบสะสมของเก่า <br />
          เขามักจะสะสมของแปลกๆ ไว้ในคฤหาสน์ส่วนตัว
          ทำให้คฤหาสน์ของเขาเต็มไปด้วยรูปปั้น งานศิลปะ และของสะสมอื่นๆ
          <br />
          อีกมากมายและยังมีความลับบางอย่าง
          <br /> ที่ซ่อนอยู่ในคฤหาสน์ แห่งนี้.
        </p>
      ),
      image: "/img/parallax/Char_owner.png",
      icon: "/img/parallax/icon_owner.png",
      className: styles.owner,
    },
    bodyguard: {
      name: "บอดี้การ์ด",
      description: (
        <p className="text-left break-words">
          ชายปริศนาสองคน ที่มาพบกล้าเป็นครั้งแรก ทั้งคู่ดูลึกลับ
          และดูเป็นอันตราย <br />
          อย่างยิ่ง พวกเขาเป็นคนพากล้าเดินทางมายังคฤหาสน์แห่งนั้น
          ซึ่งเป็นจุดเริ่มต้นของเรื่องราวทั้งหมด.
        </p>
      ),
      image: "/img/parallax/Char_bodyguard.png",
      icon: "/img/parallax/icon_bodyguard.png",
      className: styles.bodyguard,
    },
    monster: {
      name: "วิญญาณปริศนา",
      description: (
        <p className="text-left break-words">
          วิญญาณปริศนาที่คอยปรากฏตัวก่อกวนอยู่ในคฤหาสน์แห่งนี้
          บ้างก็ว่าเป็นผีร้าย บ้างก็ว่าเป็นปีศาจที่น่ากลัว
          ไม่มีใครล่วงรู้ที่มาและสิ่งที่มันต้องการ แต่มันอาจจะเป็นสิ่งที่ "กล้า"
          จะต้องเผชิญหน้า.
        </p>
      ),
      image: "/img/parallax/Char_monster.png",
      icon: "/img/parallax/icon_monster.png",
      className: styles.monster,
    },
  };

  //ตัวละครเอียงตามเมาส์
  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 30;
    const y = (e.clientY / innerHeight - 0.5) * 30;
    setTilt({ x, y });
  };

  // Arrow Movement on Character Selection
  useEffect(() => {
    const charIndex = Object.keys(characters).indexOf(activeChar);
    const newTopPosition = charIndex * 7.2 + 3;
    const tl = gsap.timeline();

    tl.to(arrowRef.current, {
      duration: 0.2,
      opacity: 0,
      ease: "power2.in",
    })
      .set(arrowRef.current, {
        top: `${newTopPosition}vw`,
      })
      .to(arrowRef.current, {
        duration: 0.2,
        opacity: 1,
        ease: "power2.out",
      });
  }, [activeChar]);

  // =================================================================
  // Section: Movie Hook
  // =================================================================

  //// Text Animation on Scroll Hook
  useEffect(() => {
    const observers = [];

    boxesRef.current.forEach((box) => {
      if (!box) return;
      const text = box.querySelector(".text");
      if (!text) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              text,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1,
                scale: 1,
                duration: 1.4,
                ease: "power2.out",
                overwrite: "auto",
              }
            );
          } else {
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

  // useEffect สำหรับ Parallax ของรูปภาพใน Box แรก (i=0)
  useEffect(() => {
    if (!boxesRef.current[0]) return;

    const ctx = gsap.context(() => {
      //รูปซ้ายbox0
      const tl_left = gsap.timeline({
        scrollTrigger: {
          trigger: boxesRef.current[0],
          start: "top center",
          end: "bottom 30%",
          scrub: 2.5,
        },
      });
      tl_left.from(".parallax-hook-item-0-left", {
        y: "-60vh",
        opacity: 0,
        rotation: -180,
        ease: "power1.out",
      });

      tl_left.to(".parallax-hook-item-0-left", {
        y: "-20vh",
        opacity: 0,
        rotation: 30,
        ease: "power1.in", // ออกไปแบบเร่งความเร็ว
      });

      //รูปขวาbox0
      const tl_right = gsap.timeline({
        scrollTrigger: {
          trigger: boxesRef.current[0],
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      tl_right.fromTo(
        ".parallax-hook-item-0-right",
        {
          y: "70vh", // 👈 [แก้ไข] เปลี่ยนเป็นค่าบวก (เริ่มจากข้างล่าง)
          opacity: 0,
          rotation: 60,
        },
        {
          y: "-50vh", // 👈 [แก้ไข] เปลี่ยนเป็นค่าลบ (เคลื่อนที่ขึ้นข้างบน)
          opacity: 0.7,
          rotation: 0,
          ease: "none",
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // useEffect สำหรับ Parallax ของรูปภาพใน Box แรก (i=1)
  useEffect(() => {
    if (!boxesRef.current[1]) return;

    const ctx = gsap.context(() => {
      // รูปซ้ายbox1
      const tl_left_1 = gsap.timeline({
        scrollTrigger: {
          trigger: boxesRef.current[1], // 📍 Trigger คือกล่องที่สอง
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8, // ลองปรับความเร็ว
        },
      });
      tl_left_1.fromTo(
        ".parallax-hook-item-1-left",
        { y: "60vh", opacity: 0, rotation: 80 }, // เริ่มจากข้างล่าง
        { y: "-40vh", opacity: 0.75, rotation: -60, ease: "none" } // เคลื่อนขึ้นข้างบน
      );

      // รูปขวาbox1
      const tl_right_1 = gsap.timeline({
        scrollTrigger: {
          trigger: boxesRef.current[1],
          start: "center bottom",
          end: "bottom center",
          scrub: 2.2,
          // markers: true,
        },
      });

      tl_right_1.from(".parallax-hook-item-1-right", {
        y: "-60vh",
        opacity: 0,
        rotation: -60,
        ease: "power1.out",
      });

      tl_right_1.to(".parallax-hook-item-1-right", {
        y: "-10vh",
        opacity: 0,
        rotation: 30,
        ease: "power1.in",
      });
    });

    return () => ctx.revert();
  }, []);

  // [เพิ่ม] useEffect สำหรับ Parallax ของรูปภาพใน Box ที่สาม (i=2)
  useEffect(() => {
    if (!boxesRef.current[2]) return;

    const ctx = gsap.context(() => {
      // รูปซ้ายbox2
      const tl_left_2 = gsap.timeline({
        scrollTrigger: {
          trigger: boxesRef.current[2],
          start: "top bottom",
          end: "bottom top",
          scrub: 2.0, // ลองปรับความเร็ว
        },
      });

      tl_left_2.fromTo(
        ".parallax-hook-item-2-left",
        { y: "55vh", opacity: 0, rotation: -30 }, // เริ่มจากข้างล่าง
        { y: "-45vh", opacity: 0.75, rotation: 30, ease: "none" } // เคลื่อนขึ้นข้างบน
      );

      // รูปขวาbox2
      const tl_right_2 = gsap.timeline({
        scrollTrigger: {
          trigger: boxesRef.current[2], // 📍 Trigger คือกล่องที่สาม
          start: "center bottom",
          end: "80% 30%",
          scrub: 1.7,
        },
      });

      tl_right_2.from(".parallax-hook-item-2-right", {
        y: "-20vh",
        opacity: 0,
        rotation: 60,
        ease: "power1.out",
      });
      tl_right_2.to(".parallax-hook-item-2-right", {
        y: "40vh",
        opacity: 0.4,
        rotation: -60,
        ease: "power1.in",
      });
    });

    return () => ctx.revert();
  }, []);

  // [เพิ่ม] useEffect สำหรับ Parallax ของรูปภาพใน Box ที่สาม (i=3)
  useEffect(() => {
    if (!boxesRef.current[3]) return;

    const ctx = gsap.context(() => {
      // รูปซ้ายbox3
      const tl_left_3 = gsap.timeline({
        scrollTrigger: {
          trigger: boxesRef.current[3],
          start: "30% 80%",
          end: "70% 40%",
          scrub: 2,
          // markers: true, // เปิดไว้เพื่อดูจุด Start/End
        },
      });

      // 1. ขาเข้า: ใช้ from() - เริ่มจากข้างบน -> ชัดเจน
      tl_left_3.from(".parallax-hook-item-3-left", {
        y: "-40vh", // เริ่มจากข้างบน
        opacity: 0,
        rotation: -90, // เริ่มจากหมุน -90 องศา
        ease: "power1.out",
      });

      // 2. ขาออก: ใช้ to() - เคลื่อนลงต่อ -> จางหาย
      tl_left_3.to(
        ".parallax-hook-item-3-left",
        {
          y: "20vh", // เคลื่อนลงมาถึงตำแหน่งสุดท้าย
          opacity: 0, // จางหายไปสนิท
          rotation: 30, // หมุนไปที่ 90 องศาตอนออก
          ease: "power1.in",
        }
        // เริ่มจางหาย ณ จุด 50% ของ ScrollTrigger
      );

      // รูปขวาbox3
      const tl_right_3 = gsap.timeline({
        scrollTrigger: {
          trigger: boxesRef.current[3],
          start: "top bottom",
          end: "bottom top",
          scrub: 1.9,
          // markers: true,
        },
      });

      tl_right_3.fromTo(
        ".parallax-hook-item-3-right",
        { y: "70vh", opacity: 0, rotation: 90 }, // เริ่มจากข้างล่าง
        { y: "-30vh", opacity: 0.75, rotation: -90, ease: "none" } // เคลื่อนขึ้นข้างบน
      );
    });

    return () => ctx.revert();
  }, []);

  // =================================================================
  // Section: Gallery
  // =================================================================

  //เก็บรูปสามรูปเล็ก
  const images = [
    "/img/parallax/screen1.png",
    "/img/parallax/screen2.png",
    "/img/parallax/screen3.png",
  ];

  //ส่วนรูปภาพ fade up อันเล็ก3อัน
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
          start: "top 88%",
          end: "bottom 20%",
          scrub: false,
          // markers: true,
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  // useEffect ใหม่สำหรับล็อคการ scroll ด้วย Lenis หน้า Gallery
  const lenis = useLenis();
  useEffect(() => {
    // ฟังก์ชันนี้จะทำงานทุกครั้งที่ selectedImage เปลี่ยนค่า
    if (selectedImage) {
      // ถ้ามีรูปถูกเลือก (popup เปิด) -> สั่งให้ Lenis "หยุด"
      lenis?.stop();
    } else {
      // ถ้าไม่มีรูป (popup ปิด) -> สั่งให้ Lenis "เล่นต่อ"
      lenis?.start();
    }
    return () => {
      lenis?.start();
    };
  }, [selectedImage, lenis]);

  // =================================================================
  // Section: Result
  // =================================================================

  // useEffect สำหรับควบคุมการนับเลข %
  useEffect(() => {
    const ctx = gsap.context(() => {
      // วนลูป ref ของแต่ละแถวใน Results Section
      resultItemRefs.current.forEach((triggerEl, index) => {
        if (!triggerEl) return;

        // หา element ของตัวเลขซ้ายและขวาในแถวนั้นๆ
        const leftNumberEl = triggerEl.querySelector(".result-number-left");
        const rightNumberEl = triggerEl.querySelector(".result-number-right");

        ScrollTrigger.create({
          trigger: triggerEl,
          start: "top 80%",
          once: true, // ให้ทำงานแค่ครั้งเดียว
          onEnter: () => {
            const leftCounter = { val: 0 };
            gsap.to(leftCounter, {
              val: resultsData[index].leftNumber,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: () => {
                // อัปเดตข้อความใน HTML โดยตรง
                if (leftNumberEl)
                  leftNumberEl.textContent = `${Math.round(leftCounter.val)}%`;
              },
            });
            const rightCounter = { val: 0 };
            gsap.to(rightCounter, {
              val: resultsData[index].rightNumber,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: () => {
                // อัปเดตข้อความใน HTML โดยตรง
                if (rightNumberEl)
                  rightNumberEl.textContent = `${Math.round(
                    rightCounter.val
                  )}%`;
              },
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  //  resultsData ข้อมูลที่นำไปแสดง ในหน้า Result
  const resultsData = [
    {
      leftDescription: "เนื้อหาของตัวละครตัวที่ 1 อธิบายเรื่องราวสั้น ๆ",
      leftNumber: 60,
      imageSrc: "/img/parallax/screen1.png",
      characterName: "ชื่อตัวละคร 1",
      rightNumber: 70,
      rightDescription:
        "ข้อมูลเสริมของตัวละครตัวที่ 1 อาจจะเป็นพลังหรือคุณสมบัติ",
    },
    {
      leftDescription: "เนื้อหาของตัวละครตัวที่ 2 อธิบายเรื่องราวสั้น ๆ",
      leftNumber: 70,
      imageSrc: "/img/parallax/screen2.png",
      characterName: "ชื่อตัวละคร 2",
      rightNumber: 80,
      rightDescription:
        "ข้อมูลเสริมของตัวละครตัวที่ 2 อาจจะเป็นพลังหรือคุณสมบัติ",
    },
    {
      leftDescription: "เนื้อหาของตัวละครตัวที่ 3 อธิบายเรื่องราวสั้น ๆ",
      leftNumber: 80,
      imageSrc: "/img/parallax/screen3.png",
      characterName: "ชื่อตัวละคร 3",
      rightNumber: 90,
      rightDescription:
        "ข้อมูลเสริมของตัวละครตัวที่ 3 อาจจะเป็นพลังหรือคุณสมบัติ",
    },
  ];

  // =================================================================
  // JSX Return
  // =================================================================
  return (
    <>
      <Navbar />

      {/* Hero Section */}
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
            src="/img/parallax/tre2.png"
            alt="tree"
            className="absolute bottom-[2vw] left-[-10vw] z-50 w-[65vw] parallax-tree-left filter brightness-0 pointer-events-none"
          />
          {/* Tree Right - เลื่อนเร็วที่สุด */}
          <img
            src="/img/parallax/tre4.png"
            alt="tree"
            className="absolute bottom-[2vw] right-[-6vw] z-50 w-[55vw] parallax-tree-right filter brightness-0 pointer-events-none"
          />
          {/* Ground Layer */}
          <img
            src="/img/parallax/ground.png"
            alt="ground"
            className="absolute bottom-0 left-0 w-full brightness-0 z-35 parallax-ground pointer-events-none"
          />

          {/* Overlay Top */}
          <div className="absolute inset-0 bg-black z-41 black-fade-overlay opacity-0"></div>
          {/* Overlay buttom */}
          <div className="absolute z-40 top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
          {/* ฟิวเตอร์ภาพ */}
          <div className="absolute inset-0 bg-[#070D07]/30 pointer-events-none z-25"></div>

          {/* Hero Content */}
          <div className="canvas_hero relative z-42 flex flex-col items-center justify-center h-screen">
            {" "}
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
            {/* ข้อความ หลัก  */}
            <div className="content_hero text-center text-white tracking-widest">
              <p
                className="p_content text-[1.5vw]"
                style={{ fontFamily: '"iannnnn-OWL' }}
              >
                THE ANIMATION INTERACTIVE MOVIE
              </p>
            </div>
            {/* ลูกศรให้เลื่อนลง */}
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

      {/* Spacer */}
      <section className="canvasblack1 relative z-22 h-[20vh] bg-black" />

      {/* Story Section */}
      <section
        id="story"
        className="relative h-[65vw] flex items-center scroll-Story"
      >
        {/* พื้นหลัง */}
        <div
          className="absolute w-[102%] h-[65vw] z-10 bg-cover bg-center brightness-140 blur-[1px] top-0 left-[-10px]"
          style={{ backgroundImage: `url('/img/parallax/BG_02_Story.png')` }}
        ></div>
        {/* รูปฝั่งวัตถุซ้าย */}
        <img
          src="/img/prop/prop009.1.png"
          alt="knight"
          className="absolute left-[-12vw] z-18 w-[50%] brightness-130 blur-[1px] opacity-100 itemStory_left"
        />
        {/* รูปฝั่งวัตถุขวา */}
        <img
          src="/img/prop/prop007.png"
          alt="knight"
          className="absolute right-[-1vw] z-10 w-[30%] brightness-120 blur-[1px] opacity-100 itemStory_right"
        />
        {/* overlay top */}
        <div className="absolute z-30 top-[-2.5vw] left-0 w-full h-[12vw] bg-gradient-to-b from-black/100 via-black/70 to-transparent"></div>
        {/* overlay buttom */}
        <div className="absolute z-22 bottom-[-5px] left-0 w-full h-[5vw] bg-gradient-to-t from-black/100 via-black/30 to-transparent"></div>
        {/* ฟิวเตอร์ */}
        <div className="absolute inset-0 bg-[#070D07]/50 pointer-events-none z-20"></div>
        <div className="content_summary absolute w-[100%] z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="content_text1 text-center text-[1.4vw] font-normal leading-[3.3vw] tracking-[0.2vw] text-white">
            “กล้า ชายหนุ่มธรรมดา ที่ใช้ชีวิตในนามหมอผี แต่กลับไร้พลังวิเศษใดๆ{" "}
            <br />
            วันหนึ่งเขาถูกบุคคลลึกลับ เชิญไปยังคฤหาสน์ปริศนาอย่างไม่เต็มใจ{" "}
            <br />
            ที่นั่นเขาต้องเผชิญหน้ากับสิ่งที่ครั้งหนึ่งเคยใช้เป็นเพียงเครื่องมือหากิน{" "}
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
      <div id=""></div>

      {/* Spacer */}
      <section className="relative h-[10vw] flex items-start z-12 bg-black"></section>

      {/* Character Section */}
      <section
        id="characters"
        className="section_character relative h-[55vw] flex items-start"
        onMouseMove={handleMouseMove}
      >
        {/* พื้นหลัง */}
        <div
          className="absolute w-[101vw] h-[55vw] z-10 bg-cover bg-center brightness-120 blur-[1px] top-0 left-[-10px]"
          style={{
            backgroundImage: "url('/img/parallax/BG_03_Character.png')",
          }}
        ></div>

        <div className="absolute z-21 top-0 left-0 w-full h-50 bg-gradient-to-b from-black/100 via-black/50 to-transparent"></div>
        <div className="absolute z-21 bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/100 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-[#070D07]/50 pointer-events-none z-20"></div>

        <div className="main_section absolute text-start z-22 text-white top-[6vw] left-[20vw]">
          <h2
            className="Head_storytext text-[8.3vw] text-[#C23213] font-light "
            style={{ fontFamily: '"MAX somsin", sans-serif' }}
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            ตัวละคร
          </h2>
          <div className="flex gap-[4vw]">
            <div className="relative flex flex-col gap-[1.2vw]">
              {/* รูปลูกศรที่ชี้ไปที่ตัวละครที่เราเลือก */}
              <img
                ref={arrowRef}
                src="/img/parallax/arrowselected.png"
                alt="selector arrow"
                className="icon_arrow absolute left-[-6.5vw] top-0 w-[6vw] transition-all duration-300"
                style={{ transform: "translateY(-50%)" }}
              />
              {/* รูปเลือกตัวละคร */}
              {Object.keys(characters).map((key) => (
                <img
                  key={key}
                  src={characters[key].icon}
                  alt={characters[key].name}
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
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-offset="300"
              >
                {/* ชื่อตัวละคร */}
                {characters[activeChar].name}
              </h3>
              <div
                className="border-b border-[#DCDCDC] w-[20vw] border-[0.5px]"
                data-aos="flip-right"
                data-aos-duration="1000"
                data-aos-delay="500"
              ></div>
              <div className="mt-[1.8vw] max-w-[22vw]">
                <div
                  className="content_textChar text-[1.05vw] font-normal leading-[2.6vw] tracking-[0.14vw] font-[1.3vw]"
                  data-aos="fade-up" // ใช้ fade
                  data-aos-anchor-placement="top-bottom"
                  data-aos-delay="400"
                  data-aos-offset="200"
                >
                  {/* ข้อมูลตัวละคร */}
                  {characters[activeChar].description}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-[3vw] left-[75vw] z-20 w-[22vw] h-auto perspective-1000">
          {/* ช่วยทำให้รูปออกได้สวยงาม */}
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
                  {/* รูปตัวละครของเรา */}
                  <img
                    src={characters[activeChar].image}
                    alt={characters[activeChar].name}
                    className="w-full h-auto"
                    data-aos="zoom-in"
                    data-aos-offset="200"
                    data-aos-delay="400"
                    data-aos-duration="1000"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Spacer */}
      <section className="relative h-[20vw] flex items-start z-12 bg-black">
        <div className="absolute z-11 bottom-0 left-0 w-full h-[20vw] bg-gradient-to-t from-black/100 via-black/50 to-transparent"></div>
      </section>

      {/* Movie Hook Section */}
      <section
        id="movie"
        className="section_Hook relative overflow-hiddenv scroll-Hook"
      >
        <div className="absolute z-21 top-0 left-0 w-full h-50 bg-gradient-to-b from-black/100 via-black/50 to-transparent"></div>
        <div className="absolute z-21 bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/100 via-black/40 to-transparent"></div>{" "}
        {/* Component Background ที่เป็นจุดๆ */}
        <AnimatedBallsBackground />
        <div className="relative z-10">
          {[
            "ภาพยนตร์เรื่องนี้ ไม่ใช่แค่การรับชม",
            "คุณจะได้มีส่วนร่วมในกำหนดเส้นทางและชะตากรรมของเรื่อง..",
            "ทุกการตัดสินใจที่คุณเลือก...จะเปลี่ยนตอนจบไปตลอดกาล",
            "ปุ่ม",
          ].map((text, i) => (
            // box นี้เป็นกรอบรูปให้ img parallax ได้
            <div
              key={i}
              className="box relative"
              ref={(el) => (boxesRef.current[i] = el)}
            >
              {/* [เพิ่ม] รูปภาพสำหรับกล่องแรก (i === 0) */}
              {i === 0 && (
                <>
                  {/* รูปซ้ายbox0 */}
                  <img
                    src="/img/prop/prop008.png"
                    alt="Parallax Left 0"
                    className="parallax-hook-item-0-left absolute left-[7vw] z-100 bottom-[-5vh] w-[16vw] brightness-80 blur-[0.5px] opacity-100"
                  />
                  {/* รูปขวาbox0 */}
                  <img
                    src="/img/prop/prop001.png"
                    alt="Parallax Right 0"
                    className="parallax-hook-item-0-right absolute right-[5vw] bottom-[20vh] w-[20vw] brightness-400 blur-[0.5px] opacity-70"
                  />
                </>
              )}

              {i === 1 && (
                <>
                  {/* รูปซ้ายbox1 */}
                  <img
                    src="/img/prop/prop009.1.png"
                    alt="Parallax Left 1"
                    className="parallax-hook-item-1-left absolute left-[6vw] top-[4vh] w-[16vw] z-20 brightness-200 blur-[1px] opacity-100"
                  />
                  {/* รูปขวาbox1 */}
                  <img
                    src="/img/prop/prop007.png"
                    alt="Parallax Right 1"
                    className="parallax-hook-item-1-right absolute right-[2vw] bottom-[1vh] w-[25vw] z-0 brightness-200 blur-[1px] opacity-100"
                  />
                </>
              )}
              {i === 2 && (
                <>
                  {/* รูปซ้ายbox2 */}
                  <img
                    src="/img/prop/prop004.png"
                    alt="Parallax Left 2"
                    className="parallax-hook-item-2-left absolute left-[0vw] bottom-[-10vh] w-[28vw] brightness-250 blur-[0.5px] opacity-100"
                  />
                  {/* รูปขวาbox2 */}
                  <img
                    src="/img/prop/prop006.png"
                    alt="Parallax Right 2"
                    className="parallax-hook-item-2-right absolute right-[4vw] top-[8vh] w-[12vw] z-0 brightness-150 blur-[0.6px]  opacity-100"
                  />
                </>
              )}
              {i === 3 && (
                <>
                  {/* รูปซ้ายbox3 */}
                  <img
                    src="/img/prop/prop002.png"
                    alt="Parallax Left 3"
                    className="parallax-hook-item-3-left absolute left-[25vw] bottom-[8vh] w-[10vw] z-0 brightness-250 blur-[0.6px] opacity-100"
                  />
                  {/* รูปขวาbox3 */}
                  <img
                    src="/img/prop/prop003.png"
                    alt="Parallax Right 3"
                    className="parallax-hook-item-3-right absolute right-[12vw] top-[2vh] w-[26vw] z-20 brightness-250 blur-[0.3px] opacity-100"
                  />
                </>
              )}

              {/* ถ้าเป็นปุ่มจะให้เป็น เงื่อนไขนี้ */}
              {text === "ปุ่ม" ? (
                <div className="text relative movie-button-wrapper">
                  <StyledButton>รับชมภาพยนตร์</StyledButton>
                </div>
              ) : (
                <div className="text relative z-10">{text}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* space */}
      <section className=" relative h-[14vw] flex items-start bg-black ">
        <div className="absolute top-0 left-0 w-full h-[14vw] bg-gradient-to-b from-black/100 via-black/50 to-transparent z-20"></div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="relative h-[50vw] flex flex-col items-center justify-center z-12 text-center bg-black scroll-Garally"
      >
        <div className="relative text-[20px] z-20 text-white tracking-[0.2vw] font-light">
          <div className="w-[48vw] h-[27vw]">
            {/* รูปใหญ่สุด */}
            <img
              data-aos="fade-up"
              src="/img/parallax/screen1.png"
              alt="main"
              className="w-full h-full object-cover shadow-lg cursor-pointer"
              onClick={() => setSelectedImage("/img/parallax/screen1.png")}
            />
          </div>

          <div ref={galleryRef} className="flex gap-[1.5vw] mt-[1.5vw]">
            {/* สามรูปเล็ก */}
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
          {/* เมื่อกดไปรูปต่างๆ popupจะทำงานฟังก์ชันนี้ แสดงรูปเต็ม */}
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

      {/* space */}
      <section className="relative h-[14vw] flex items-start z-12 bg-black ">
        <div className="absolute z-[11] top-0 left-0 w-full h-[12vw] bg-gradient-to-b from-black/100 via-black/50 to-transparent"></div>
      </section>

      {/* Results Section */}
      <section
        id="results"
        className="relative h-[50vw] flex flex-col items-center justify-center z-12 scroll-Results"
      >
        {/* พื้นหลัง */}
        <div
          className="absolute w-[101vw] h-[50vw] bg-cover bg-center brightness-100 blur-[1px] top-0 left-[-10px]"
          style={{ backgroundImage: "url('/img/parallax/BG_04_static.png')" }}
        ></div>
        {/* overlay top */}
        <div className=" absolute z-22 top-0 left-0 w-full h-[5vw] bg-gradient-to-b from-black/100 via-black/50 to-black/0 "></div>
        {/* overlay buttom */}
        <div className="absolute z-22 bottom-[-1vw] left-0 w-full h-20 bg-gradient-to-t from-black/100 via-black/60 to-black/0"></div>
        {/* ฟิวเตอร์ */}
        <div className="absolute inset-0 bg-[#070D07]/50 pointer-events-none z-20"></div>

        <div className="z-23 text-center mt-[-5vw]">
          <div className="tracking-[0.2vw] mt-[1vw] mb-[-1.5vw] ">
            {/* ชื่อ section  */}
            <h2
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-delay="200"
              data-aos-offset="300"
              className="Head_storytextName text-[8.3vw] text-[#C23213] font-light z-30"
              style={{ fontFamily: '"MAX somsin", sans-serif' }}
            >
              ผลลัพธ์
            </h2>
          </div>
        </div>
        <div className="z-20 flex flex-col gap-[1.6vw]">
          {/* ตัวข้อมูลหน้าผลลัพธ์เก็บอยู่ใน  บนresultsData */}
          {resultsData.map((result, index) => (
            <div
              key={index} // ใช้ index จาก map เป็น key
              ref={(el) => (resultItemRefs.current[index] = el)}
              className="flex items-center justify-center gap-12 "
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-delay="200"
            >
              {/* --- ส่วนด้านซ้าย --- */}
              <div className="flex flex-row items-center w-[20vw] text-white mt-[-2.5vw] gap-[1.5vw]">
                {/* ข้อมูลเหตุการณ์ฝั่งซ้าย */}
                <p className="text-[0.9vw] leading-relaxed opacity-70 text-right">
                  {result.leftDescription}
                </p>
                {/* ตัวเลขฝั่งซ้าย */}
                <p className="result-number-left text-[4vw] font-bold mt-[-0.1vw]">
                  0%
                </p>
              </div>

              {/* --- ส่วนตรงกลาง (รูปภาพ) --- */}
              <div className="w-[14vw]">
                <img
                  data-aos="fade-up"
                  data-aos-offset="100"
                  data-aos-delay="200"
                  src={result.imageSrc}
                  alt={result.characterName}
                  className="shadow-lg h-[7vw] w-[14vw]"
                />
                {/* ชื่อเหตุการนั้นๆ อยู่ล่างภาพ */}
                <p className="mt-[1vw] text-[1.3vw] text-center text-white tracking-wide">
                  {result.characterName}
                </p>
              </div>

              {/* --- ส่วนด้านขวา --- */}
              <div className="flex flex-row items-center w-[20vw] text-white mt-[-2.5vw] gap-[1.5vw]">
                {/* ตัวเลขฝั่งขวา */}
                <p className="result-number-right text-[4vw] font-bold mt-[-0.1vw]">
                  0%
                </p>
                {/* ข้อมูลเหตุการณ์ฝั่งขวา */}
                <p className="text-[0.9vw] leading-relaxed opacity-70 text-left">
                  {result.rightDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="h-[14vw] bg-black flex justify-center items-center flex-col gap-[2vw] h-auto py-10">
        <div className="flex justify-center items-center gap-10">
          <img src="/img/logo/AAD.svg" alt="AAD" className="w-[7vw]" />
          <img src="/img/logo/DMP.svg" alt="DMP" className="w-[7vw]" />
          <img src="/img/logo/logokmit.svg" alt="KMIT" className="w-[7vw]" />
        </div>
        <div className="flex justify-center items-center flex-col text-center gap-[1vw]">
          <div className="flex justify-center items-center gap-[0.4vw]">
            <img
              src="/img/logo/ifacebook.svg"
              alt="Facebook"
              className="w-[2.3vw]"
            />
            <img
              src="/img/logo/iig.svg"
              alt="Instagram"
              className="w-[2.5vw]"
            />
            <img
              src="/img/logo/isocial.svg"
              alt="Social"
              className="w-[2.5vw]"
            />
            <img src="/img/logo/iemail.svg" alt="Email" className="w-[2.5vw]" />
          </div>
          <p className="text-white text-[1.3vw]">โดย มงคล</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
