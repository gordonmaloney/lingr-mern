import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { NewLingModal } from "./NewLingModal";
import { useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from 'reactstrap';

export const MenuComponent = () => {

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const lings = useSelector((state) => state.posts.reverse());

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

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogOut();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  //count unread replies
  const usersLings = lings.filter(
    (ling) => (ling.userPersistentId === user?.result?.persistentId || ling.userId === user?.result?._id )
  );
  var allReplies = [];
  usersLings.map((ling) =>
    ling.lingRepliesObj.map((reply) => allReplies.push(reply))
  );
  const unreadReplies = allReplies.filter(
    (reply) => reply.replyRead !== true
  ).length;

  return user ? (
    <>
      <div className="d-block d-md-none">
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto" >
           {user && <h4 className="welcome-msg">Welcome to Lingr, {user?.result?.userName}! {user?.result?.userIcon}
            </h4> }
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
            <Link to="/">
            <NewLingModal />
          </Link>

          <Link to="/" onClick={toggleNavbar}>
            <Button color="primary" className="menu-btn" outline>
              📰<span> Timeline</span>
            </Button>
          </Link>

            <Link to="/notifications" onClick={toggleNavbar}>
            <Button color="primary" className="menu-btn" outline>
              🔔
              <span>
                {" "}
                Notifications
                {unreadReplies > 0 && (
                  <span
                    style={{
                      backgroundColor: "lightskyblue",
                      color: "white",
                      padding: 5,
                      marginLeft: 10,
                      borderRadius: "50px",
                    }}
                  >
                    {unreadReplies}
                  </span>
                )}
              </span>
            </Button>
          </Link>
          <Link to="/profile" onClick={toggleNavbar}>
            <Button color="primary" className="menu-btn" outline>
              🧍<span> Profile</span>
            </Button>
          </Link>
          
          <Link to="/" onClick={toggleNavbar}>
            <Button
              color="primary"
              className="menu-btn"
              outline
              onClick={handleLogOut}
            >
              ◀️<span> Log-out</span>
            </Button>
          </Link>

            </Nav>
          </Collapse>
        </Navbar>
      </div>

      <Row className="mb-3">
        <Col xs="12" className="d-none d-md-block">
        {user && <h4 className="welcome-msg">Welcome to Lingr, {user?.result?.userName}! {user?.result?.userIcon}
            </h4> }
        </Col>

        <Col className="d-none d-md-block" sm="12">
          <Link to="/">
            <NewLingModal />
          </Link>
        </Col>
        <Col className="d-none d-md-block" sm="12">
          <Link to="/">
            <Button color="primary" className="menu-btn" outline>
              📰<span className="d-none d-md-inline"> Timeline</span>
            </Button>
          </Link>
        </Col>
        <Col className="d-none d-md-block" sm="12">
          <Link to="/notifications">
            <Button color="primary" className="menu-btn" outline>
              🔔
              <span className="d-none d-md-inline">
                {" "}
                Notifications
                {unreadReplies > 0 && (
                  <span
                    style={{
                      backgroundColor: "lightskyblue",
                      color: "white",
                      padding: 5,
                      marginLeft: 10,
                      borderRadius: "50px",
                    }}
                  >
                    {unreadReplies}
                  </span>
                )}
              </span>
            </Button>
          </Link>
        </Col>
        <Col className="d-none d-md-block" sm="12">
          <Link to="/profile">
            <Button color="primary" className="menu-btn" outline>
              🧍<span className="d-none d-md-inline"> Profile</span>
            </Button>
          </Link>
        </Col>
        <Col className="d-none d-md-block" sm="12">
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

    
<div className="d-block d-md-none">
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">
            {" "}
            Welcome to Lingr, {user?.result?.userName}! {user?.result?.userIcon}
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>


          <Link to="/about"  onClick={toggleNavbar}>
            <Button color="primary" className="menu-btn" outline>
              ❓<span className="d-inline d-sm-none d-md-inline"> About</span>
            </Button>
          </Link>

          <Link to="/signin"  onClick={toggleNavbar}> 
          <Button
            color="primary"
            className="menu-btn"
            outline
          >
            ▶️
            <span className="d-inline d-sm-none d-md-inline"> Log-in</span>
          </Button>
          </Link>


          <Link to="join"  onClick={toggleNavbar}>
          <Button
            color="primary"
            className="menu-btn"
            outline
          >
            ✍️
            <span className="d-inline d-sm-none d-md-inline"> Sign-up</span>
          </Button>
          </Link>

            </Nav>
          </Collapse>
        </Navbar>
      </div>

      <Row className="mb-3">
      <Col className="d-none d-md-block" sm="12">
          <Link to="/about">
            <Button color="primary" className="menu-btn" outline>
              ❓<span className="d-inline d-sm-none d-md-inline"> About</span>
            </Button>
          </Link>
        </Col>
        <Col className="d-none d-md-block" sm="12">
          <Button
            color="primary"
            className="menu-btn"
            outline
            onClick={() => history.push("/signin")}
          >
            ▶️
            <span className="d-inline d-sm-none d-md-inline"> Log-in</span>
          </Button>
        </Col>
        <Col className="d-none d-md-block" sm="12">
          <Button
            color="primary"
            className="menu-btn"
            outline
            onClick={() => history.push("/join")}
          >
            ✍️
            <span className="d-inline d-sm-none d-md-inline"> Sign-up</span>
          </Button>
        </Col>
      </Row>
    </>
  );
};
