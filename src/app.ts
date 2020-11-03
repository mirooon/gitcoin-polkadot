// Import
import { ApiPromise, WsProvider } from "@polkadot/api";
import { askForAttribute, askForValue } from "./lib/inquirer";
import { BlockDetails } from "./models/block-details";

// // Construct
const wsProvider = new WsProvider("wss://kusama-rpc.polkadot.io");

async function getAPI() {
  return await ApiPromise.create({ provider: wsProvider });
}

(async (): Promise<void> => {
  try {
    const attributeResponse = await askForAttribute();

    const isAttributeHash =
      attributeResponse.attribute === "hash" ? true : false;

    const valueResponse = await askForValue(isAttributeHash);

    const api = await getAPI();

    let signedBlock;
    if (!isAttributeHash) {
      const hash = await api.rpc.chain.getBlockHash(valueResponse.value);
      console.log(`Hash for block number ${valueResponse.value} is ${hash.toHex()}`);
      signedBlock = await api.rpc.chain.getBlock(hash);
    } else {
      signedBlock = await api.rpc.chain.getBlock(valueResponse.value);
    }
    let blockDetails: BlockDetails = {
      parentHash: signedBlock.block.header.parentHash.toHex(),
      number: signedBlock.block.header.number.toHex(),
      stateRoot: signedBlock.block.header.stateRoot.toHex(),
      extrinsicsRoot: signedBlock.block.header.extrinsicsRoot.toHex(),
      digest: signedBlock.block.header.digest.toHex(),
    };
    console.log("blockDetails");
    console.log(blockDetails);
  } catch (error) {
    console.log(error);
  }
})();
