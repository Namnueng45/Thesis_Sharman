import React from "react";

// Component นี้จะ "โง่" คือทำหน้าที่แค่แสดงตัวเลขที่ได้รับมาเท่านั้น
const CountingNumber = ({ number, className }) => {
  return <p className={className}>{number}%</p>;
};

export default CountingNumber;
