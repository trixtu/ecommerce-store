"use client"
import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/Button";
import { Minus } from 'lucide-react';
import { Plus } from 'lucide-react';
import { useState } from "react";

import { useCartStore } from "@/hooks/use-cart-store";

interface InfoProps {
  data: Product;
}

interface Location<T> {
  hash: string
  key: string
  pathname: string
  search: string
  state: T
}
const Info: React.FC<InfoProps> = ({ data }) => {
  const [qty, setQty] = useState(1)

  const addToCart = useCartStore(state => state.addToCart)

  const handleDecrement = () => {
    if (qty > 1) {
      setQty(prevCount => prevCount - 1)
    }
  }

  const handleIncrement = () => {
    if (qty < 10) {
      setQty(prevCount => prevCount + 1)
    }
  }


  return (
    <div>
      <hr className="my-4" />
      <div className="flex items-center justify-end">
        <div className="text-2xl text-gray-900">
          <Currency value={data.price} />
        </div>
      </div>


      {/* Options Product */}
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <div></div>
        <div></div>
      </div>
      {/* end */}

      {/* add to cart */}
      <div className="flex items-center justify-end">
        <div>
          <label htmlFor="qty">
            <span className=" font-semibold">Anzahl:</span>
          </label>
          <div className="text-left">
            <div className="flex items-center justify-center">
              <Button
                className=" rounded-none inline-block bg-neutral-400 p-1 hover:bg-neutral-500"
                onClick={handleDecrement}
              >
                <Minus className="w-6 h-6 " />
              </Button>
              <div className="flex items-center justify-center border  rounded-none h-8 mx-1 w-14 text-center border-neutral-400">{qty}</div>
              <Button
                className=" rounded-none inline-block bg-neutral-400 p-1 hover:bg-neutral-500"
                onClick={handleIncrement}
              >
                <Plus className="w-6 h-6 " />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Button
            className=" rounded-none inline-block bg-red-600 px-8 py-1 mt-6 ml-2"
            onClick={() => addToCart(data)}
          >
            In den Warenkorb
          </Button>
        </div>
      </div>

      {/* description */}

      <div className=" mt-4" ><h2 >Technische Daten <span >Aluminium Ausziehtisch Binz</span></h2><ul>
        <li> Material: Aluminium (pulverbeschichtet) / Glas</li>
        <li> Eigenschaften: ausziehbar / Tischplatte aus Glas in Kermaikoptik </li>
        <li> Farbe: dunkelgrau (Gestell)) / grau (Glas)</li>
        <li> Maß: ca. 200 (300) x 110 x 75 cm oder 180 (240) x 100 x 75 cm</li>
        <li> Lieferung als vormontierter Bausatz</li>
      </ul></div>


    </div>
  );
};

export default Info;
