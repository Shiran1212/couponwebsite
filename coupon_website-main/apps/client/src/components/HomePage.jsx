import React from "react";
import myVideo from "../assets/Untitled design.mp4";
import myVideo2 from "../assets/zara.mp4";
import myVideo3 from "../assets/new Collection.mp4";
import myphoto from "../assets/its time for.png";
import { Search } from "./Search";

export const HomePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <br />
      {user && <Search />}
<br />
      <video
        autoPlay
        loop
        muted
        src={myVideo3}
        className="navbar-image"
      ></video>
      <br />
      <br />
      <div className="gallery">
        <div className="row">
          <video
            autoPlay
            loop
            muted
            src={myVideo}
            className="navbar-video"
          ></video>
          <video
            autoPlay
            loop
            muted
            src={myVideo2}
            className="navbar-video"
          ></video>
          <img src={myphoto} alt="My Photo" className="navbar-video" />
        </div>
        <br />
        <br />
        {/* Search Container and Search Component removed */}
        <br />
        <br />
      </div>
    </div>
  );
};

export default HomePage;
