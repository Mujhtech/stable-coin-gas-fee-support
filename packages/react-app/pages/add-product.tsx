import { FormEvent, useState } from "react";
import { useCelo } from "@celo/react-celo";
import { CeloContract } from "@celo/contractkit";
import { CeloMarketPlace_ABI } from "@/blockchain/CeloMarketPlace";

export default function Home() {
  const { address, performActions } = useCelo();
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [content, setContent] = useState<string>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await performActions(async (kit) => {
      try {
        kit.connection.defaultFeeCurrency = CeloContract.StableToken;
        const res = await new kit.connection.web3.eth.Contract(
          CeloMarketPlace_ABI,
          "0x53E6b76075BE8a5B32AffA5823fb9388d7A4FE7b"
        ).methods
          .createProduct(
            name,
            " https://miro.medium.com/v2/resize:fit:1400/format:webp/1*65HxJ5NB7oJyrJmvJzguWA.png",
            content,
            "Lagos",
            price
          )
          .send({ from: address });
        // console.log(transaction);
      } catch (e) {
        //
        console.log(e);
      }
    });
  };

  return (
    <div className="w-full md:min-w-[550px] max-w-[600px] p-0 m-0">
      <div className="border-2 border-black rounded-lg w-full relative">
        <div className="flex flex-col px-4 py-5">
          <h4 className="mb-4">Add new swag</h4>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col space-y-4"
          >
            <div className="mb-4 flex flex-col space-y-2">
              <label className="text-md text-black">Name</label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4 flex flex-col space-y-2">
              <label className="text-md text-black">Price (in cUSD)</label>
              <input
                type="number"
                className="form-control"
                required
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className="mb-4  flex flex-col space-y-2">
              <label className="text-md text-black">Content</label>
              <textarea
                required
                className="form-control min-h-[200px]"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center text-center rounded-full border border-black bg-black py-2 px-5 text-md font-medium text-snow hover:bg-black"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
