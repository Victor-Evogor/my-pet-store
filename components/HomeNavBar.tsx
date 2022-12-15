import logo from "../assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import bell from "../assets/bell.svg";
import cart from "../assets/cart.svg";
import {
  getUser,
  deleteCartItem,
  updateCartItem,
  addNotification,
  deleteAllCartItems,
} from "../firebase";
import getSavedUser from "../utils/getSavedUser";
import deleteSavedUser from "../utils/deleteSavedUser";
import decimalPoints from "../utils/decimalPoints";
import { useRouter } from "next/router";
import { UserContext, SetUserContext, setPingContext, setPingMessageContext } from "../pages/home";
import User from "../types/User";
import DropDown from "./DropDown";
import CartItem from "../types/CartItem";
import Notification from "../types/Notification";
import ping from "../utils/ping";

function NavBar() {
  const [bgVisible, setBgVisible] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const router = useRouter();
  const setPing = useContext(setPingContext);
  

  let user = useContext(UserContext);
  let setUser = useContext(SetUserContext);
  let setPingMessage = useContext(setPingMessageContext)

  function checkOut() {
    const priceOfCart = cartValue();
    const quantity = cartQuantity();
    const message = `You successfully checked out ${quantity} items worth ${priceOfCart} USD. Thank you for your patronage, your items will be delivered to you shortly`;
    setPingMessage!(message)
    const notification: Notification = {
      message,
      read: false,
    };

    setIsCartOpen(false);
    
 
    // add notification
    addNotification(getSavedUser()!, notification)
      .then(() => {
        deleteAllCartItems(getSavedUser()!).finally(()=>{
          ping()
          refreshUser()
          setPing!(true);
        });
      })
      .catch(console.error);
    // delete all cart items

    // play sound
  }

  function cartQuantity(): number {
    return user.cart.reduce((prev, item: CartItem) => {
      return prev + Number(item.quantity);
    }, 0);
  }

  function cartValue(): number {
    return decimalPoints(
      user.cart.reduce((prev, item: CartItem) => {
        return prev + Number(item.price) * Number(item.quantity);
      }, 0),
      2
    );
  }

  function removeCartItem(index: number) {
    // delete cart item
    deleteCartItem(getSavedUser()!, index).finally(() => {
      refreshUser();
    });
  }

  function refreshUser() {
    
    return getUser(getSavedUser()!)
      .then((userData) => {
        console.log(userData);
        setUser!(userData as User);
      })
      .catch((reason) => {
        console.log(`Error: ${reason}`);
        deleteSavedUser();
        router.push("/sign-in");
      });
  }

  useEffect(() => {
   
    window.document.onscroll = (_) => {
      if (scrollY >= 32) {
        setBgVisible(true);
      } else {
        setBgVisible(false);
      }
    };

    refreshUser();

    return () => {
      window.document.onscroll = null;
    };
  }, []);

  function LogOut() {
    deleteSavedUser();
    router.push("/");
  }

  function CartDropDown() {
    return (
      <DropDown visible={isCartOpen}>
        {user.cart.length ? (
          <>
            {user!.cart.map((item: CartItem, key) => (
              <li key={key} className="bg-light px-3 py-2 whitespace-nowrap">
                <span>
                  {item.name} x {item.quantity} = $
                  {decimalPoints(item.quantity * item.price, 2)}
                </span>
                <div className="row justify-between">
                  <div
                    className="btn btn-success col-5"
                    onClick={() => {
                      updateCartItem(getSavedUser()!, user.cart[key]).finally(
                        () => {
                          refreshUser();
                        }
                      );
                    }}
                  >
                    Add
                  </div>
                  <div
                    className="btn btn-danger col-5 whitespace-nowrap px-2 w-auto"
                    onClick={() => {
                      removeCartItem(key);
                    }}
                  >
                    Remove
                  </div>
                </div>
              </li>
            ))}{" "}
            <div>
              <p className="text-center font-bold">${cartValue()}</p>

              <div
                className="text-center py-2 border rounded-md active:bg-gray-500 transition-colors cursor-pointer"
                onClick={checkOut}
              >
                Check Out
              </div>
            </div>
          </>
        ) : (
          <p className="my-3 mx-2 whitespace-nowrap">Cart Empty</p>
        )}
      </DropDown>
    );
  }

  return (
    <nav
      className="top-0 sticky py-2"
      style={{
        backgroundColor: bgVisible ? "#b4a6a255" : "transparent",
        zIndex: 1000,
      }}
    >
      <div className="flex justify-between items-center px-3">
        <div className="flex items-end">
          <Link href="/">
            <Image src={logo} alt="logo" className="w-40" />
          </Link>
        </div>
        <div>
          <div className="flex gap-x-3 items-center relative">
            
            <div className="relative flex">
              <div
                className="cursor-pointer flex justify-center items-center rounded-full hover:bg-brown-100 p-2"
                onClick={() => {
                  setIsCartOpen(!isCartOpen);
                }}
              >
                <Image src={cart} alt="cart" className="w-8 cart" />
                {user!.cart.length ? (
                  <div className="w-4 h-4 rounded-full absolute top-2 right-0 bg-orange"></div>
                ) : (
                  ""
                )}
              </div>
              <ul className="items-center p-0 rounded-xl w-max">
                <CartDropDown />
              </ul>
            </div>
            <div
              className="ml-2 cursor-pointer hover:bg-brown-100 transition px-3 py-1 rounded-md"
              onClick={LogOut}
            >
              <span>Log Out</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
