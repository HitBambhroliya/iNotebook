import React from "react";

function About() {
  return (
    <>
      <div className="my-3" style={{ textAlign: "center"}}>
        <h2>About</h2>
        <p>
          iNotebook is react-base web app in which user can secure their notes
          on the cloud..
        </p>
        <h3>Functionality of the iNotebook </h3>
        <ul style={{ listStyleType: "none" }}>
          <li>User can Sign up and login with their credentials.</li>
          <li>
            User can Add the new note along with title, description and tag.
          </li>
          <li>User can easily update the existing note.</li>
          <li>User can easily delete their notes.</li>
          <li>
            User can secure and save their personal information like password on
            the cloud with high security.
          </li>
        </ul>
      </div>
      <div  style={{
          
            
          textAlign: "center",
          
          marginTop:"275px",
          
          
        }}>
        <footer
         
        >
          all rights reserved 2023 @ iNotebook | created by Hit Bambhroliya
        </footer>
      </div>
    </>
  );
}

export default About;
