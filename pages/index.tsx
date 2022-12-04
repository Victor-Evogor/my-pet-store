import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";
import Link from "next/link";
import bg from "../images/bg-image.jpg";
import arrowRight from "../assets/right-arrow-2.svg";
import imageVideo from "../images/dog-wide-image.jpg";
import dogFace from "../assets/dog-face.svg";
import playBtn from "../assets/play-btn.svg";
import dogHead from "../assets/dog-head.svg";
import puppy from "../images/puppy-tp-bg.png";
import pitBull from "../images/pit-bull-tp-bg.png";
import styles from "../styles/modules/home.module.scss";
import Underline from "../components/Underline";

function Top() {
  return (<section className="container py-32">
  <h1>
    Your Pet
    <br />
    Care Center
  </h1>
  <p>
    Before you bring home your pet, be sure you&apos;re
    <br /> ready to take care of it properly
  </p>
  <div className="my-8 flex items-center gap-3">
    <div className="py-3 px-6 bg-purple rounded-full cursor-pointer  shadow-2xl">
      <span className="text-light flex items-center gap-3">
        <span>Our Services</span>
        <Image src={arrowRight} alt="Our services" className="w-10" />
      </span>
    </div>
    <div className="navigation-link">
      <Link href="#">Schedule a Call</Link>
      <Underline/>
    </div>
  </div>
  <div>
    <div className="w-1/2 flex justify-end">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Link href="#" className="absolute top-1/4 play-btn">
            <Image src={playBtn} alt="Play" className="w-10" />
          </Link>
          <Image
            src={imageVideo}
            alt="How to take"
            className="w-40 rounded-lg"
          />
        </div>
        <div>
          <Image src={dogFace} alt="Dog Face" className="w-10" />
          <h6>
            How to Take Care
            <br /> of Your Pets
          </h6>
          <p>
            Learn how to take care of your
            <br /> pets with proper guidance
          </p>
        </div>
      </div>
    </div>
  </div>
</section>);
}

function Middle(){
  return (<section className="bg-dark rounded-3xl px-10 py-10">
  <div className={"row flex-nowrap w-full mx-0 " + styles.display}>
    <div className="col-md-3 rounded-lg relative">
      <div className="flex items-center gap-x-2">
        <h6 className="mb-0">My Pet Store</h6>{" "}
        <Image src={dogHead} alt="dog head" className="w-16" />
      </div>
      <p className="my-1">
        Let us know what we can
        <br/> do for your pet
      </p>
      <div className="pipe border-l h-1/2 absolute right-0 top-1/4"></div>
    </div>
    <div className="col-md-3 cursor-pointer rounded-lg">
      <div className="flex flex-col items-center justify-between">
        <Image src={puppy} alt="Puppy" className="w-16" />
        <h6 className="mb-0">Adopt a Puppy</h6>
      </div>
      <div className={styles.circle}></div>
    </div>
    <div className="col-md-3 cursor-pointer rounded-lg">
      <div className="flex flex-col">
        <Image src={pitBull} alt="Puppy" className="w-16" />
        <h6 className="mb-0">Feed with Love</h6>
        <p className="mt-0 mb-0 text-xs">
          Feed your pet with love ad care
        </p>
      </div>
      <div className={styles.circle}></div>
    </div>
    <div className="col-md-3 flex justify-center items-center flex-col cursor-pointer rounded-lg">
      <div className="rounded-full bg-green p-3 flex items-center justify-center w-24 h-24 text-lg">
        <span>55+</span>
      </div>
      <h6 className="mt-2">Pet Stories</h6>
      <div className={styles.circle}></div>
    </div>
  </div>
</section>);
}

export default function Home() {
  return (
    <main>
      <header
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: "cover",
        }}
        className="pb-10 text-dark"
      >
        <NavBar />
        <Top/>
      </header>
      <section className="container text-light text-sm">
        <Middle/>
      </section>
    </main>
  );
}
