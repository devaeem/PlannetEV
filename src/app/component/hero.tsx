import React from "react";
import CalculateIcon from "@mui/icons-material/Calculate";
export default function Hero() {
  return (
    <>
      <div className="bg-slate-700 h-[75vh] flex items-center justify-center text-center ">
        <div>
          <div>
            <CalculateIcon style={{ fontSize: "9rem", color: "white" }} />
          </div>
          <h1 className="text-[90px] font-bold text-orange-500">ประเมินราคาแพ็คเกจ</h1>
          <p className="mt-4 text-7xl text-white">Installation Calculate</p>
          <p className="mt-4 text-5xl text-white pt-2">การประเมินราคานี้เป็นการให้ข้อมูลเบื้องต้นเท่านั้น</p>
          <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-md">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}
