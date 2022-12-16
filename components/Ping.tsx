import { FunctionComponent, useContext } from "react";
import { SetPingContext } from "../pages/home"
import { motion } from "framer-motion";

interface PingProps {
  message: string,
  visible: boolean
}

const Ping: FunctionComponent<PingProps> = ({ message, visible }) => {
  let setPing = useContext(SetPingContext);
  const openAnimation = {
    bottom: "2.54rem",
    opacity: 1,
    transform: "scale(1)"
  }
  const closedAnimation = {
    bottom: "-5rem",
    opacity: 0,
    transform: "scale(0)"
  }
  return (
    <motion.div className="fixed sm:right-10 mx-3 sm:mx-0 px-5 py-3 max-w-md border-2 shadow-md rounded-sm bg-light" style={{
      display: visible?"block":"none"
    }} animate={visible? openAnimation: closedAnimation }>
        <div className="flex justify-end">
        <button type="button" className="close text-red-600" aria-label="Close" onClick={event =>{
          setPing!(false)
        }}>
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
      <p>{message}</p>
    </motion.div>
  );
};

export default Ping;
