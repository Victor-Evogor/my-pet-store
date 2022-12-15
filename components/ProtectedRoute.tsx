import {FunctionComponent, useEffect} from "react"
import getSavedUser from "../utils/getSavedUser";
import { useRouter } from "next/router";
interface ProtectedRouteProps{
    children: JSX.Element
} 

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({children}) => {
    let router = useRouter();
    useEffect(()=>{
        let userUid = getSavedUser();
        if(!userUid){
            router.push("/sign-in")
        }
    }, [])
    return <div>
        {children}
    </div>
}
 
export default ProtectedRoute;