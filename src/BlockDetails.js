import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { useSubstrate } from "./substrate-lib";

export default function Main(props) {
  const { api } = useSubstrate();
  const [blockNumber, setBlockNumber] = useState("");
  const [blockHeaderHash, setBlockHeaderHash] = useState("");
  const [parentHash, setParentBlockHash] = useState("");


  useEffect(() => {
    const subscribeNewHeads = async () => {
      try {
        await api.rpc.chain.subscribeNewHeads(async (header) => {
          let headerHashHex = header.hash.toHex();
          setBlockHeaderHash(headerHashHex);
          let signedBlock = await api.rpc.chain.getBlock();
          setParentBlockHash(signedBlock.block.header.parentHash.toHex());
          setBlockNumber(signedBlock.block.header.number.toString());
        });
      } catch (e) {
        console.log(e);
      }
    };
    subscribeNewHeads().catch(console.error);
  }, []);

  return (
    <Grid.Column>
      <h1>Block Details</h1>
        <h3>Block number: </h3>{blockNumber}
        <h3>Header hash: </h3> {blockHeaderHash}
        <h3>Parent hash: </h3> {parentHash}
    </Grid.Column>
  );
}
