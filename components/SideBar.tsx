import caret from "../assets/caret.svg";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

function Category({ name, pets }: { name: string; pets: string[] }) {
  let [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <motion.div animate={isOpen ? "open" : "closed"} initial={false}>
      <motion.div
        className="my-1 hover:bg-brown-100 py-2 px-3 rounded-md flex items-center justify-between"
        onClick={() => {
          console.log("Tapping");
          setIsOpen(!isOpen);
        }}
      >
        {name}
        <motion.div
          whileTap={{ scale: 0.97 }}
          variants={{
            open: { rotate: -90 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
          className="w-4"
        >
          <Image src={caret} alt="caret" className="w-full" />
        </motion.div>
      </motion.div>
      <hr />
      <motion.ul
      className="px-0 mx-0"
        variants={{
          open: {
            //   clipPath: "inset(0% 0% 0% 0% round 10px)",
            display: "block",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            display: "none",
            //   clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
      >
        {pets.map((pet, key) => (
          <motion.li
            variants={{
              open: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 300, damping: 24 },
              },
              closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
            }}
            key={key}
            className="relative hover:bg-brown-100 py-3 px-2 cursor-pointer"
          >
            {pet}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

function SideBar() {
  return (
    <section>
      <Category
        name="Domestics"
        pets={["Dogs", "Cats", "Hamsters", "Parrots"]}
      />
      <Category
        name="Wild"
        pets={["Lions", "Bears", "Giraffe", "Snakes", "Chameleons"]}
      />
      <Category
        name="Livestock"
        pets={["Goats", "Chickens", "Pigs", "Cows", "Sheep"]}
      />
      <Category
        name="Sea"
        pets={["Gold Fishes", "Octopuses", "Sharks", "Oysters", "Sea Horses"]}
      />
      <Category
        name="Rare"
        pets={[
          "Elephants",
          "Pandas",
          "Komodo Dragons",
          "Orca",
          "Silver Back Gorillas",
        ]}
      />
      <Category name="Pets for the Holidays" pets={[
        "Snow Flake Mouse",
        "Thanks Giving Turkey",
        "Easter Bunnies"
      ]} />
    </section>
  );
}

export default SideBar;
