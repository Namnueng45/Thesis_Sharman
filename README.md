# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

คำสั่งในการ push ขึ้น GIT
git add .
git commit -m "update"
git push

Layout respoonsive
ถ้าอยากให้ dev ขยายตามหน้าจอ 3 วิธี

1. Media Queries
   Ex.
   @media (min-width: 768px) {
   .container {
   font-size: 16px; /_ Tablet _/
   }
   }
   หรือ
   <div class="text-sm sm:text-base md:text-lg lg:text-xl">
   Responsive Text
   </div>
2. Flexible Layout
Flexible Layout (Flex/Grid)
Ex.
<div class="flex flex-wrap gap-4">
    <div class="flex-1 bg-blue-300">Box 1</div>
    <div class="flex-1 bg-blue-400">Box 2</div>
    <div class="flex-1 bg-blue-500">Box 3</div>
</div>
3. Fluid / Relative Units
   (%, vw, vh, rem, em แทน px)
   Ex. w-[60%] max-w-[750px]

ถ้าเป็นรูปใช้
Responsive Images
Ex. <img src="image.jpg" class="w-full max-w-[400px] h-auto" />

++ การใช้ flex ++

1. เรียงแกน x ใช้ content , justify-center justifly-....
2. แนวตั้ง y ใช้ item , items-center items-....
3. ตัวหนังสื้อให้อยู่ตามที่ต้องการใช้ text-center text-....
