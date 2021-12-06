import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";
const About = () => {
  const visitTwitter = () => {
    window.location = "https://twitter.com/FrustuPlayer";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://preflight-cdn.live.gelato.tech/product/preview?&type=scene&product_uid=apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_classic_gsi_m_gco_navy_gpr_4-4&scene=editor/front"
              alt="Founder"
            />
            <Typography>Rohit Sharma</Typography>
            <Button onClick={visitTwitter} color="primary">
              Visit Twitter
            </Button>
            <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/channel/UCySo0A1teN8gY7CA3UgFcBQ"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://twitter.com/FrustuPlayer" target="blank">
              <TwitterIcon className="twitterSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;