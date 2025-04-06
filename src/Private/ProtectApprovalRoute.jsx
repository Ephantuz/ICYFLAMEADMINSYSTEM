import { useSelector } from "react-redux";


export const useApprovalStatus = () => {
    const { loggedIn, isApproved } = useSelector((state) => state.auth);
    
    return {
      isApproved: loggedIn && isApproved === "Approved",  // Boolean for easy conditional checks
      status: loggedIn ? isApproved : null,             // Raw status ('Approved', 'Declined', 'Pending')
      isDeclined: loggedIn && isApproved === "Declined", // Explicit boolean for declined state
      isPending: loggedIn && isApproved !== "Approved" && isApproved !== "Declined" // Everything else
    };
  };