import { useState } from "react";

function useIsLoggedIn(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return isLoggedIn
}

export default useIsLoggedIn