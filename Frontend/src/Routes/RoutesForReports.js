import React,{useState,useEffect} from 'react'
import { useOktaAuth } from "@okta/okta-react";
import Reportcharting from '../screens/Reports/2';

export default function RoutesForReports() {
    const { authState } = useOktaAuth();
    const [verifytok, setVerifytok] = useState(null);
    const [findTokenUser,setfindTokenUser ] = useState(null);
    


    // Assume you have the JWT token stored in a variable called jwtToken

 const extractToken = () => {
    const jwtToken = verifytok;

    // Decode the JWT token
    const decodedToken = jwtToken && jwtToken.split(".")[1];
    const base64 = decodedToken && decodedToken.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = base64 && decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    
    // Parse the JSON payload to access its contents
    const tokenData = jsonPayload && JSON.parse(jsonPayload);
    
    // Access the sub claim
    const sub = tokenData && tokenData.sub;
    setfindTokenUser(sub);
    // console.log(sub); // This will print "payfiadmin@payfi.co.in"
 }


  useEffect(() => {
    if (authState && authState.accessToken) {
      const { accessToken } = authState.accessToken;
      setVerifytok(accessToken);
    }
    extractToken()
  }, [authState]);


  return (
    <div>
          {findTokenUser === "payfiadmin@payfi.co.in" ? (
              <Reportcharting /> 
            ) : (
              // <Route path="/reports" element={<OtherReportsComponent />} />
              "ok"
            )  
          }
    </div>
  )
}
