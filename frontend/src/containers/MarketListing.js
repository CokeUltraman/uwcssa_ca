import React, { useEffect } from "react";

import MarketComponent from "../components/Market/MarketComponent";
import { connect } from "react-redux";
import { setMarkets } from "../redux/actions/articleActions";

const MarketListing = ({ setMarkets }) => {
  useEffect(() => {
    setMarkets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <MarketComponent />
    </div>
  );
};

export default connect(null, { setMarkets })(MarketListing);
