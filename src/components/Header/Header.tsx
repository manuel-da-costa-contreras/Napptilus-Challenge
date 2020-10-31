import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { HeaderProps } from './Header-props';

const Header = (props: HeaderProps): ReactElement => {
  const logo =
    'https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/logo-umpa-loompa.png';

  return (
    <div className="header">
      <div className="container container--header">
        <Link to="/">
          <img src={logo} />
        </Link>
        <h1 className="header--title">{props.title}</h1>
      </div>
    </div>
  );
};

Header.defaultProps = {
  title: "Oompa Loompa's Crew",
};

export default Header;
