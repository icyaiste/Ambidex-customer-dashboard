import { useEffect, useState } from "react";
import { checkIsAuthenticated, signIn } from "../services/AuthService";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function PrivateRoute(): React.JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      try {
        setIsLoading(true); // Reset loading state
        const authStatus = await checkIsAuthenticated();
        setIsAuthenticated(authStatus);

        if (!authStatus) {
          signIn();
        }
      } catch (error) {
        console.error("There has been an error", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    authenticate();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <></>; // Return an empty fragment/nothing
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
export default PrivateRoute;
