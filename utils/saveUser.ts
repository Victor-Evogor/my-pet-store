import { UserCredential, User} from "firebase/auth"

function saveUser(user: User) {
    window.localStorage.setItem("UUID", user.uid);
}

export default saveUser