import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [user, setuser] = useState([]);
  const [name, setName] = useState({});
  const [location, setLocation] = useState({});
  const [picture, setpicture] = useState([]);
  const [gender, setGender] = useState([]);
  const [checked , setchecked] = useState("")
  const [toggle, setToggle] = useState(true);

  const fetchData = () => {
    axios
      .get(
        `https://randomuser.me/api/?inc=gender,name,nat,location,picture,email&results=20`
      )
      .then((response) => {
        setuser(response.data.results);
        console.log(response.data.results);
      });
  };

  const selectCard = (name, location, picture, gender, index) => {
    console.log(name);
    console.log(index);
    setName(name);
    setLocation(location);
    setGender(gender);
    setpicture(picture);
    setToggle(false);
    setchecked(index)
    // document.querySelector(".card").classList.add("active");
    // user.map((todo, j) => j !== index ? console.log("Sf") :console.log("dd"))
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="container">
        {toggle ? (
          <div className="hero-card">
            <div className="left-profile">
              <img
                src="https://randomuser.me/api/portraits/men/66.jpg"
                alt="profile"
              />
            </div>
            <div className="right-content">
              <h1 className="right-heading">Shaikh Faruk</h1>
              <p className="address">Delhi, India</p>
              <p className="gender">Male</p>
            </div>
          </div>
        ) : (
          <div className="hero-card">
            <div className="left-profile">
              <img src={picture.large} alt="profile" />
            </div>
            <div className="right-content">
              <h1 className="right-heading">
                {name.title} {name.first} {name.last}
              </h1>
              <p className="address">
                <span className="col-num">{location.street.number} </span>
                {location.street.name}{" "}
                <span className="state">{location.city},</span>{" "}
                <span>{location.postcode}</span>{" "}
                <span>{location.timezone.offset}</span> - {location.city},{" "}
                {location.state}, <span>{location.country}</span>
              </p>
              <p className="gender">{gender}</p>
            </div>
          </div>
        )}

        <div className="cards">
          {user.map((curr, index) => {
            return (
              <>
                <div
                  className="card"
                  style={{"backgroundColor" : checked === index ? "#a259ff": ""}}
                  onClick={selectCard.bind(
                    this,
                    curr.name,
                    curr.location,
                    curr.picture,
                    curr.gender,
                    index
                  )}>
                  <div className="card-top">
                    <span className="card-gender">{curr.gender}</span>
                    <span> . </span>
                    <span className="state">{curr.nat}</span>
                  </div>
                  <h2 className="card-heading">
                    {curr.name.title} {curr.name.first} {curr.name.last}
                  </h2>
                  <div className="mail">{curr.email}</div>
                </div>
              </>
            );
          })}
          {/* <div className="card active">
            <div className="card-top">
              <span className="card-gender">Female</span>
              <span>.</span>
              <span className="state">NL</span>
            </div>
            <h2 className="card-heading">Ms. Teatske Nijenhuis</h2>
            <div className="mail">teatske.nijenhuis@example.com</div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
