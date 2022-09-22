import { NavLink } from "react-router-dom";
import "./pagenotfound.css"


const PageNotFound = () => {
    return (
      <div>
        <div className="pagenotfound_container">
          <h1>Page Not Found</h1>
          <NavLink className="pagenotfound_link" to={"/"}>
            <img
              className="doggo_img"
              src="https://images.pexels.com/photos/4587995/pexels-photo-4587995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="404"
            ></img>
            <div className="pagenotfound_secondline">Click me to go back home...</div>
          </NavLink>
        </div>
        <div className="footer_container">
          <div className="footer_div">
            @ 2022 Airbb, Inc. &nbsp;·&nbsp;
            <a
              className="github_link"
              href="https://github.com/kevykim"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            &nbsp;·&nbsp;
            <a
              className="linkedin_link"
              href="https://linkedin.com/in/kevin-kim-a88429150"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            &nbsp;·&nbsp;
            <a
              className="email_link"
              href="mailto:kebonkim@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    );
}

export default PageNotFound;