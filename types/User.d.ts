import CartItem from "./CartItem"
import Notification from "./Notification"

interface User{
    cart:CartItem[],
    uuid:string,
    notifications:Notification[]
  }

export default User