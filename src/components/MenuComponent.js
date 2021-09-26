import React, {useState, useEffect} from "react";
import { Button, Row, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { NewLingModal } from "./NewLingModal";
import { useHistory, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'

export const MenuComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();


  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const handleLogInOutClick = () => {
    setIsLoggedIn((prev) => !prev);
  };

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
  };


  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogOut();
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])


  return user ? (
    <>
      <Row className="mb-3">
        <Col>
          <h4>
            Welcome to Lingr, {user?.result?.userName}!
          </h4> 
        </Col>
        <Col xs="4" sm="12">
          <Link to="/">
            <NewLingModal />
          </Link>
        </Col>
        <Col xs="2" sm="12">
          <Link to="/">
            <Button color="primary" className="menu-btn" outline>
              📰<span className="d-none d-md-inline"> Timeline</span>
            </Button>
          </Link>
        </Col>
        <Col xs="2" sm="12">
          <Link to="/notifications">
            <Button color="primary" className="menu-btn" outline>
              🔔<span className="d-none d-md-inline"> Notifications</span>
            </Button>
          </Link>
        </Col>
        <Col xs="2" sm="12">
          <Link to="/profile">
            <Button color="primary" className="menu-btn" outline>
              🧍<span className="d-none d-md-inline"> Profile</span>
            </Button>
          </Link>
        </Col>
        <Col xs="2" sm="12">
          <Link to="/">
            <Button
              color="primary"
              className="menu-btn"
              outline
              onClick={handleLogOut}
            >
              ◀️<span className="d-none d-md-inline"> Log-out</span>
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  ) : (
    <>
      <Row className="mb-3">
        <Col xs="6" sm="12">
          <Link to="/about">
            <Button color="primary" className="menu-btn" outline>
              ❓<span className="d-inline d-sm-none d-md-inline"> About</span>
            </Button>
          </Link>
        </Col>
        <Col xs="6" sm="12">
          <Button
            color="primary"
            className="menu-btn"
            outline
            onClick={() => history.push('/signin')}
          >
            ▶️
            <span className="d-inline d-sm-none d-md-inline"> Log-in</span>
          </Button>
          <Button
            color="primary"
            className="menu-btn"
            outline
            onClick={() => history.push('/join')}
          >
            ✍️
            <span className="d-inline d-sm-none d-md-inline"> Sign-up</span>
          </Button>
        </Col>
      </Row>
    </>
  );
};
