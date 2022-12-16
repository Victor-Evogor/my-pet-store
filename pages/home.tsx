import { FunctionComponent } from "react";
import User from "../types/User";
import ProtectedRoute from "../components/ProtectedRoute";
import HomeNavBar from "../components/HomeNavBar";
import SideBar from "../components/SideBar";
import Listing from "../components/Listing";
import {
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { getPets, addToCart, getUser, updateCartItem } from "../firebase";
import Pets from "../types/Pets";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Pet from "../types/Pet";
import getSavedUser from "../utils/getSavedUser";
import CartItem from "../types/CartItem";
import deleteSavedUser from "../utils/deleteSavedUser";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Ping from "../components/Ping";
import SlidingNavBar from "../components/SlidingNavBar";

export const UserContext = createContext<User>({
  cart: [],
  notifications: [],
  uuid: "",
});

export const SetUserContext = createContext<Dispatch<
  SetStateAction<User>
> | null>(null);

export const SetPingContext = createContext<Dispatch<
  SetStateAction<boolean>
> | null>(null);
export const SetPingMessageContext = createContext<Dispatch<
  SetStateAction<string>
> | null>(null);
export const SideBarOpenContext = createContext<boolean | null>(null);
export const SetSideBarOpenContext = createContext<Dispatch<
  SetStateAction<boolean>
> | null>(null);

function LoadingSkeleton() {
  // create an a 9 length array filled with zeros
  const arr = new Array(9).fill(0);
  return (
    <>
      {arr.map((_: any, index: number) => (
        <div className="col-md-3 card" key={index}>
          <Skeleton width={"100%"} height={200} className="card-img-top " />
          <div className="card-body">
            <Skeleton />
            <br />
            <br />
            <Skeleton count={5} />
          </div>
        </div>
      ))}
    </>
  );
}

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [pingVisible, setPingVisible] = useState<boolean>(false);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [pingMessage, setPingMessage] = useState<string>("");

  let [user, setUser] = useState<User>({
    cart: [],
    uuid: "",
    notifications: [],
  });

  const router = useRouter();
  function addPetToCart({ name, price }: Pet) {
    const cart: CartItem = { name, price, quantity: 1 };
    // check if user have the cart item already

    if (
      user.cart.find((cartItem: CartItem) => {
        return cartItem.name === cart.name && cartItem.price === cart.price;
      })
    ) {
      // update the quantity of the selected cart
      console.log("Item already in cart");
      updateCartItem(getSavedUser()!, cart).then(() => {
        getUser(getSavedUser()!)
          .then((user) => {
            setUser(user as User);
          })
          .catch(() => {
            deleteSavedUser();
            router.push("/sign-in");
          });
      });
    } else {
      addToCart(
        getSavedUser()! /* get saved user from local storage */,
        cart
      ).then(() => {
        getUser(getSavedUser()!)
          .then((user) => {
            setUser(user as User);
          })
          .catch(() => {
            deleteSavedUser();
            router.push("/sign-in");
          });
      });
    }
  }

  let [pets, setPets] = useState<Pets | null>(null);

  useEffect(() => {
    getPets().then((petsData) => {
      setPets(petsData);
    });
  }, []);

  return (
    <>
      <ProtectedRoute>
        <UserContext.Provider value={user}>
          <SetUserContext.Provider value={setUser}>
            <SetPingContext.Provider value={setPingVisible}>
              <SetPingMessageContext.Provider value={setPingMessage}>
                <SetSideBarOpenContext.Provider value={setSideBarOpen}>
                  <SideBarOpenContext.Provider value={sideBarOpen}>
                    <main>
                      <HomeNavBar />
                      <section className="flex">
                        <section className="py-10 px-6 w-72 hidden sm:block">
                          <SideBar />
                        </section>
                        <section className="row flex-wrap gap-y-2 md:gap-x-2 mx-3 my-4 md:mx-0 md:my-0 w-full">
                          {pets ? (
                            pets?.dogs.map(
                              (
                                { name, price, description, image_url },
                                index
                              ) => (
                                <div className="col-md-3" key={index}>
                                  <Listing
                                    name={name}
                                    description={description}
                                    image={"/pets/dogs/" + image_url}
                                    price={price}
                                    addToCart={addPetToCart}
                                  />
                                </div>
                              )
                            )
                          ) : (
                            <LoadingSkeleton />
                          )}
                        </section>
                      </section>
                    </main>
                    <Ping message={pingMessage} visible={pingVisible} />
                    <SlidingNavBar open={sideBarOpen}>
                      <SideBar/>
                    </SlidingNavBar>
                  </SideBarOpenContext.Provider>
                </SetSideBarOpenContext.Provider>
              </SetPingMessageContext.Provider>
            </SetPingContext.Provider>
          </SetUserContext.Provider>
        </UserContext.Provider>
      </ProtectedRoute>
      <Footer />
    </>
  );
};

export default Home;
