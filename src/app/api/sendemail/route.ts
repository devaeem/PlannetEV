import axios from "axios";
import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const useDay = Math.floor((body.day / 100) * 24) || 8;
  const useNight = Math.floor((body.night / 100) * 24) + 1;

  const newData: any = {
    building: body.building,
    name: body.fname + " " + body.lname,
    day: `${useDay} ชั่วโมง`,
    night: `${useNight} ชั่วโมง`,
    phone: body.phone,
    email: body.email,
    address: body.address,
    location: body.location,
    power: body.power,
    pricePower: body.pricePower,
    salePower: body.salePower,
    sizePower: body.sizePower,
    image: body.image,
    contect: body.contect ? "ต้องการให้ติดต่อกลับ" : "ไม่ต้องการให้ติดต่อกลับ",
  };

  const transport = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL_ALL,
    subject: `คุณ ${newData.name} สนใจในการติดตั้งแผงโซล่าเซลล์`,
    text: `
    ชื่อ-นามสกุล: ${newData.name}
    ประเภทอาคาร: ${newData.building}
    จำนวนไฟที่ใช้เวลากลางวัน: ${newData.day}
    จำนวนไฟที่ใช้เวลากลางคืน: ${newData.night}
    เบอร์ติดต่อกลับ: ${newData.phone}
    อีเมล: ${newData.email}
    ที่อยู่(สถานที่ติดตั้ง) : ${newData.address}
    Location(Link Google Maps) : ${newData.location}
    ระบบไฟ: ${newData.power}
    ค่าไฟเดือนล่าสุด(บาท):${newData.pricePower} บาท
    การขายไฟ: ${newData.salePower}
    ขนาดที่ติดตั้ง(kW): ${newData.sizePower} kW
    รูปบิลค่าไฟเดือนล่าสุด: ${newData.image}
    การติดต่อ: ${newData.contect}
`,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  console.log("sendMailPromise", sendMailPromise);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${process.env.LINE_TOKEN}`,
  };

  const data = {
    message: `คุณ ${newData.name} สนใจติดตั้งแผงโซล่าเซลล์ กรุณาตรวจสอบอีเมลของคุณ
    ประเภทอาคาร: ${newData.building}
    จำนวนไฟที่ใช้เวลากลางวัน: ${newData.day}
    จำนวนไฟที่ใช้เวลากลางคืน: ${newData.night}
    เบอร์ติดต่อกลับ: ${newData.phone}
    อีเมล: ${newData.email}
    ที่อยู่(สถานที่ติดตั้ง) : ${newData.address}
    Location(Link Google Maps) : ${newData.location}
    ระบบไฟ: ${newData.power}
    ค่าไฟเดือนล่าสุด(บาท):${newData.pricePower} บาท
    การขายไฟ: ${newData.salePower}
    ขนาดที่ติดตั้ง(kW): ${newData.sizePower} kW
    รูปบิลค่าไฟเดือนล่าสุด: ${newData.image}
    การติดต่อ: ${newData.contect}

    `,
  };

  const resLine = axios.post(`${process.env.LINE_API}`, data, {
    headers,
  });

  try {
    await sendMailPromise();
    await resLine;
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
