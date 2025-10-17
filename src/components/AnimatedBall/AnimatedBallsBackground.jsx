import React from "react";
import "./AnimatedBalls.css"; // เราจะสร้างไฟล์ CSS นี้ในขั้นตอนถัดไป

const AnimatedBallsBackground = () => {
  // สร้าง Array ของตัวเลขเพื่อวนลูปสร้างลูกบอล 8 ลูก
  const balls = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <div className="balls-background-container">
      {balls.map((index) => (
        <span key={index} className="ball"></span>
      ))}
    </div>
  );
};

export default AnimatedBallsBackground;
