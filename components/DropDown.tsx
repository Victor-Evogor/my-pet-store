import { FunctionComponent, ReactNode } from "react"

interface DropDownProps {
    children: ReactNode,
    visible: boolean
}
 
const DropDown: FunctionComponent<DropDownProps> = ({children, visible=true}) => {
    return ( <div className="absolute top-14 border rounded-lg z-10" style={{
        left: "-100%",
        display: visible?"block":"none"
    }}>
        <div className="relative rounded-lg max-h-96 overflow-y-auto">
        
        {children}
    
        </div>
    <div className="w-full h-full blur-md absolute -top-1 -z-10 rounded-lg" style={{
        backgroundColor: "#fcfcfd34"
    }}></div>
    </div> );
}
 
export default DropDown;