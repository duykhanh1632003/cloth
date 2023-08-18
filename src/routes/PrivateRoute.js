import { useContext } from "react";
import { UserContext } from "../contex/userContext";
import { Alert  } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const PrivateRoute = (props) => {
	const user = useSelector(state => state.user.account) 
  if((user && !user.auth) || user.role !== "R1"){
	return <> You don't have perrmission to accept
      <Alert variant="danger" dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>
	</>
  }
  return (
    <>
      {props.children}
    </>
  );
};

export default PrivateRoute;
