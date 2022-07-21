import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ loadMore }) => {
  const { Button, ButtonBox } = css;

  return (
    <div className={ButtonBox}>
      <button className={Button} type="button" onClick={loadMore}>
        load more
      </button>
    </div>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
