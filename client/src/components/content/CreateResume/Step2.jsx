import React from 'react';
import { Icon } from 'antd';

const Step2 = () => (
  <div className="block connect-social-block">
    <h2>Социальные профили</h2>
    <div className="connect-social-container">
      <a className="connect-social gh" href="http://localhost:5000/auth/github"><Icon type="github"/></a>
      <a className="connect-social md" href="http://localhost:5000/auth/medium"><Icon type="medium"/></a>
    </div>
  </div>
);

export default Step2;
