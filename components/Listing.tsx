import Image from "next/image";
import cart from "../assets/cart.svg"
import Pet from "../types/Pet"

type ListingProps = {
    image: string,
    name: string,
    description: string,
    price: number,
    addToCart: (pet:Pet)=>void
}

function Listing({image, name, description, price, addToCart}:ListingProps) {
    return ( <section className="card h-full">
        <Image src={image} alt={name} className="card-img-top" width={500} height={500}/>
        <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <p className="card-text max-h-44 overflow-auto">{description}</p>
        <p className="font-bold">${price}</p>
        <div className="cursor-pointer py-3 text-center bg-blue-100 rounded-md hover:brightness-75" onClick={()=>addToCart({name, price, description, image_url:image})}>Add to cart <Image src={cart} alt="cart" className="w-10 inline"/></div>
        </div>
    </section> );
}

export default Listing;