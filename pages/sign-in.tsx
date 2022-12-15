import { FunctionComponent } from "react"
import { signIn } from "../firebase/"
import { useRef, FormEventHandler } from "react"
import { UserCredential } from "firebase/auth"
import AuthForm from "../components/AuthForm"
import Link from "next/link"
import { useRouter } from "next/router"
import saveUser from "../utils/saveUser"

interface SignInProps {
    
}
 
const SignIn: FunctionComponent<SignInProps> = () => {
    const password =  useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null)
    const router = useRouter();
    const submit= (event:Event)=>{
        event.preventDefault();
        console.log(email.current!.value, password.current!.value)
       signIn(email.current!.value, password.current!.value).then( (user:UserCredential) =>{
        saveUser(user.user);
        router.push("/home")
       }).catch(err =>{
        console.error(err);
       }) 
    }
    return ( <section>
        <AuthForm submit={submit} email={email} password={password} type="sign in"/>
    </section> );
}
 
export default SignIn;