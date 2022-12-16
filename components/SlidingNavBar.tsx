import { FunctionComponent, ReactElement } from "react"
import { motion, Variants } from "framer-motion"

interface SlidingNavBarProps {
    open:boolean,
    children: ReactElement
}

 
const SlidingNavBar: FunctionComponent<SlidingNavBarProps> = ({open, children}) => {

    const parentVariant:Variants = {
        open:{
            left: 0,
            opacity: 1,
        },
        closed: {
            left: "-60%",
            opacity: 0,
        }
    }
    return ( <motion.div className="fixed w-3/5 h-full top-0 left-0 bg-slate-100 bg-opacity-70 z-40 px-4 pt-20 overflow-y-auto block sm:hidden" animate={open?"open":"closed"} variants={parentVariant}>
        {children}
    </motion.div> );
}
 
export default SlidingNavBar;