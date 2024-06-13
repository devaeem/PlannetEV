import Image from "next/image";
import Navbar from "./component/navbar";
import Hero from "./component/hero";
import Inputfrom from "./component/inputfrom";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />

        <Inputfrom />

    </div>
  );
}
