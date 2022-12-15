import { FunctionComponent } from "react";
import { createUser, addUser } from "../firebase/";
import { useRef} from "react";
import { UserCredential } from "firebase/auth";
import AuthForm from "../components/AuthForm";
import Link from "next/link";
import saveUser from "../utils/saveUser"
import {useRouter} from "next/router"

interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = () => {
  const router = useRouter()
  let email = useRef<HTMLInputElement>(null);
  let password = useRef<HTMLInputElement>(null);
  const submit = (event: Event) => {
    event.preventDefault();
    createUser(email.current!.value, password.current!.value)
      .then(cred=>{
        // save uuid in the db
        addUser(cred.user.uid);
        saveUser(cred.user);
        router.push("/home")
        
      })
      .catch(console.log);
  };
  return (
    <section>
      <AuthForm email={email} password={password} submit={submit} type="create account"/>
    </section>
  );
};

export default SignUp;
