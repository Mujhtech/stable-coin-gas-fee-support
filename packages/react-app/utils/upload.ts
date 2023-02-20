import { create as ipfsHttpClient } from "ipfs-http-client";

const client = ipfsHttpClient({
  host: "https://ipfs.infura.io:5001/api/v0",
});

export const uploadToIpfs = async (e: any) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const added = await client.add(file, {
      progress: (prog) => console.log(`received: ${prog}`),
    });
    return `https://ipfs.infura.io/ipfs/${added.path}`;
  } catch (error: any) {
    console.log("Error uploading file: ", error);
    if (error && error.message) {
      alert(error.message);
    }
  }
};
