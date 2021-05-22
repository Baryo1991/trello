import React from "react";
const Logo = ({width = 200, height = 200}) => {
  return (
    <div>
      <img
        src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"
        alt={"logo"}
        width = {width}
        height = {height}
      />
    </div>
  );
};

export default Logo;
