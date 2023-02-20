import ProductCard from "@/components/ProductCard";
import { useContract } from "@/hooks/useContract";
import { CeloMarketPlace_ABI } from "@/blockchain/CeloMarketPlace";
import { useEffect, useState } from "react";
import { Product, transformProductData } from "@/utils/product";
import { useCelo } from "@celo/react-celo";
import { BigNumber, ethers } from "ethers";
import { CeloContract, newKitFromWeb3, StableToken } from "@celo/contractkit";

export default function Home() {
  const [products, setProducts] = useState<Product[] | null>();
  const contract = useContract(
    CeloMarketPlace_ABI,
    "0x53E6b76075BE8a5B32AffA5823fb9388d7A4FE7b"
  );

  const { performActions, address, getConnectedKit } = useCelo();

  const fetchAllProduct = async () => {
    try {
      let products: Product[] = [];
      const productLength = await contract!.methods.getProductsLength().call();
      for (let i = 0; i < productLength; i++) {
        const [product] = await Promise.all([
          contract!.methods.getProduct(i).call(),
        ]);
        console.log(product);
        products.push({ ...transformProductData(product, i) });
      }
      setProducts(products);
    } catch (e) {
      console.log(e);
    }
  };

  const handleBuy = async (product: Product) => {
    await performActions(async (kit) => {
      try {
        const web3Kit = newKitFromWeb3(kit.connection.web3);

        await web3Kit.setFeeCurrency(CeloContract.StableToken);

        let cUSDcontract = await web3Kit.contracts.getStableToken(
          StableToken.cUSD
        );

        const approveTx = cUSDcontract.increaseAllowance(
          "0x53E6b76075BE8a5B32AffA5823fb9388d7A4FE7b",
          product.price
        );

        const gasPrice = await kit.connection.web3.eth.getGasPrice();
        const approveReceipt = await approveTx.sendAndWaitForReceipt({
          gasPrice,
        });

        console.log(approveReceipt.blockHash);

        await new kit.connection.web3.eth.Contract(
          CeloMarketPlace_ABI,
          "0x53E6b76075BE8a5B32AffA5823fb9388d7A4FE7b"
        ).methods
          .buyProduct(product.index)
          .send({
            from: address,
          });
      } catch (e) {
        //
        console.log(e);
      }
    });
  };

  useEffect(() => {
    if (products == null) {
      fetchAllProduct();
    }
  });

  return (
    <div className="flex flex-wrap w-full">
      {products != null && products.length > 0 ? (
        products.map((data: Product, index: number) => (
          <ProductCard data={data} key={index} buy={() => handleBuy(data)} />
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}
