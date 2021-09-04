import React from "react";
import { useParams } from "react-router-dom";
// import { Loading, Tabs, Icon } from "element-react";

function MarketPage() {
  const params = useParams();
  return <div>MarketPage {params.marketId} </div>;
}

export default MarketPage;
