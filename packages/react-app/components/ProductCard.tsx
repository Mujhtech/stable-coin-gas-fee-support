import { shortenAddress } from "@/utils/address";
import { Product } from "@/utils/product";
import Image from "next/image";
import { Identicon } from "./Identicon";

type Props = {
  data: Product;
  buy: () => void;
};

export default function ProductCard({ data, buy }: Props) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 flex-shrink-[0] group p-0 m-0">
      <div className="mb-10 px-3 py-0 relative w-full inline-block flex-shrink-[0]">
        <div className="relative cursor-pointer w-full p-0 m-0">
          <div className="group-hover:-translate-x-2 group-hover:-translate-y-2 duration-75 transition ease-out bg-white relative border-black border-2 z-[2] rounded-[8px]">
            <div className="flex flex-col">
              <div className="p-6">
                <div className="relative w-1/2 h-[50px] mb-3">
                  {data.image ? (
                    <img
                      src={data.image}
                      alt="Celo"
                      className="w-1/2"
                      height={300}
                    />
                  ) : (
                    <Image src="/logo.svg" alt="Celo" fill={true} />
                  )}
                </div>
                <h3 className="mb-2 font-black text-2xl w-full text-ellipsis">
                  {data.name}
                </h3>
                <p className="w-full text-xs font-bold ">{data.content}</p>
                <div className="flex flex-row items-center space-x-3">
                  <div className="my-2 flex items-center space-x-1">
                    <h6 className="text-sm font-black">{data.price}cUSD</h6>
                  </div>
                  <div className="my-2 flex items-center space-x-1">
                    <Identicon address={data.creator} size={24} />

                    <h6 className="text-sm font-black">
                      {shortenAddress(data.creator, true, true)}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="flex items-center border-t-2 border-black px-6 divide-x-2 divide-black justify-center">
                <button
                  disabled={data.bought}
                  type="button"
                  onClick={() => buy()}
                  className="py-3 w-1/2 text-md text-black font-semibold disabled:cursor-not-allowed"
                >
                  {data.bought ? "Sold out" : "Buy Product"}
                </button>
              </div>
            </div>
          </div>
          <div className="absolute left-0 top-0 right-0 bottom-0 rounded-[12px]  border-black border-2 z-[1] bg-primary opacity-0 group-hover:opacity-100"></div>
        </div>
      </div>
    </div>
  );
}
