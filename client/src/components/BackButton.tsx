import '../assets/styles/back-button.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as LeftArrow } from '../assets/icons/left-arrow.svg';
import { FunctionComponent } from 'react';

const BackButton: FunctionComponent<{ path?: string }> = ({ path = '/' }) => {
  return (
    <div className="back-btn">
      <Link to={path}>
        <LeftArrow /> <span>Return to articles</span>
      </Link>
    </div>
  );
};

export default BackButton;
