// Make nav bar that will be available globally
import logo from "../assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ArrowRight from "../assets/right-arrow.svg";
import Underline from "./Underline";

function NavBar() {

  const [bgVisible, setBgVisible] = useState<boolean>(false);

  useEffect(() => {
    window.document.onscroll = (_)=>{
      if(scrollY >= 32){
        setBgVisible(true)
      }else{
        setBgVisible(false)
      }
    }
    return ()=> {window.document.onscroll = null}
  }, []);


  return (
    <nav className="top-0 sticky py-2" style={{
      backgroundColor: bgVisible?"#b4a6a255":"transparent"
    }}>
      <div className="container flex justify-between items-center">
      <div className="flex items-end">
        <Link href="/">
          <Image src={logo} alt="logo" className="w-40" />
        </Link>
        <ul className="items-center gap-4 hidden md:flex">
          <li>
            <Link href="#" className="navigation-link">
              <span>About</span>
              <Underline/>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex flex-col justify-center navigation-link">
            <span>About</span>
            <Underline/>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex flex-col justify-center navigation-link">
            <span>About</span>
            <Underline/>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex flex-col justify-center navigation-link">
            <span>About</span>
            <Underline/>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex flex-col justify-center navigation-link">
            <span>About</span>
            <Underline/>
            </Link>
          </li>
        </ul>
      </div>
      <Link
        className="rounded-full py-3 px-8 bg-light flex items-center gap-2"
        href="/sign-in"
      >
        <span>Sign In</span>
        <Image src={ArrowRight} alt="sign in" className="w-4" />
      </Link>
      </div>
    </nav>
  );
}

export default NavBar;
