"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import
const api_1 = require("@polkadot/api");
const inquirer_1 = require("./lib/inquirer");
// // Construct
const wsProvider = new api_1.WsProvider("wss://kusama-rpc.polkadot.io");
async function getAPI() {
    return await api_1.ApiPromise.create({ provider: wsProvider });
}
(async () => {
    try {
        const attributeResponse = await inquirer_1.askForAttribute();
        const isAttributeHash = attributeResponse.attribute === "hash" ? true : false;
        const valueResponse = await inquirer_1.askForValue(isAttributeHash);
        const api = await getAPI();
        let signedBlock;
        if (!isAttributeHash) {
            const hash = await api.rpc.chain.getBlockHash(valueResponse.value);
            console.log(`Hash for block number ${valueResponse.value} is ${hash.toHex()}`);
            signedBlock = await api.rpc.chain.getBlock(hash);
        }
        else {
            signedBlock = await api.rpc.chain.getBlock(valueResponse.value);
        }
        let blockDetails = {
            parentHash: signedBlock.block.header.parentHash.toHex(),
            number: signedBlock.block.header.number.toHex(),
            stateRoot: signedBlock.block.header.stateRoot.toHex(),
            extrinsicsRoot: signedBlock.block.header.extrinsicsRoot.toHex(),
            digest: signedBlock.block.header.digest.toHex(),
        };
        console.log("blockDetails");
        console.log(blockDetails);
    }
    catch (error) {
        console.log(error);
    }
})();
