

import React from "react";

// set the defaults
const UserContext = React.createContext({
  user: { id: 4, name: 'Tom' },
  setUser: () => { }
});

export default UserContext;
