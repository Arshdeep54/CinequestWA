import React, { useState } from "react";
import Navbar from "./Navbar";

function Homepage() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <Navbar loggedIn={loggedIn} />
      <div> Main content to appoint doc with search barh </div>
    </>
  );
}

export default Homepage;
