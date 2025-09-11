import "./home.css";
function Home() {
  return (
    <>
      <div className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold ">LOGO</div>
        <ul className="navbar flex justify-between gap-2 border-1 text-center w-[60%] max-w-[800px]">
          {/* max-w-[600px] min-w-[350px] */}
          <li className="flex-1 min-w-[80px] max-w-[150px] border-1">
            <a href="#synopsis">เรื่องย่อ</a>
          </li>
          <li className="flex-1 min-w-[80px] max-w-[150px]">
            <a href="#characters">ตัวละคร</a>
          </li>
          <li className="flex-1 min-w-[80px] max-w-[150px]">
            <a href="#trailer">ตัวอย่าง</a>
          </li>
          <li className="flex-1 min-w-[80px] max-w-[150px]">
            <a href="#gallery">รูปภาพ</a>
          </li>
          <li className="flex-1 min-w-[80px] max-w-[150px]">
            <a href="#results">ผลลัพธ์</a>
          </li>
        </ul>{" "}
      </div>
    </>
  );
}
// const styles = {
//   bg: {
//     display: "flex",
//     width: "100%",
//     // height: "230px",
//   },
// };

export default Home;
