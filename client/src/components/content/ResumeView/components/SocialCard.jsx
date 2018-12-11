/* eslint-disable jsx-a11y/anchor-has-content,arrow-body-style,no-unused-vars */
import React from "react";
import { string, number } from "prop-types";
import { Icon } from "antd";

const SocialCard = props => {
  return (
    <div className="socials-card">
      <div className="socials-card-bg">
        <Icon type={props.type} />
      </div>
      <div className="socials-card-content">
        <header className="socials-card-header">
          <div className="socials-card-name">{props.name}</div>
          <div className="socials-card-desc">{props.desc}</div>
        </header>
        <footer className="socials-card-footer">
          <a className="socials-card-link" href={props.link}>
            <Icon type="ie" />
            {props.link}
          </a>
          <div className="socials-card-bottom-line">
            <div className="socials-card-stats">
              <div className="socials-card-followers">
                <Icon type="heart" />
                {props.likes}
              </div>
              <div className="socials-card-stars">
                <Icon type="star" />
                {props.stars}
              </div>
            </div>
            <a className="socials-card-open" href={props.link}>
              OPEN
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

SocialCard.propTypes = {
  type: string.isRequired,
  name: string.isRequired,
  desc: string,
  link: string.isRequired,
  likes: number,
  stars: number
};

SocialCard.defaultProps = {
  desc: "",
  likes: 0,
  stars: 0
};

export default SocialCard;
