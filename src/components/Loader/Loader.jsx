import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  const { LoaderBox } = css;

  return (
    <div className={LoaderBox}>
      <ThreeDots color="#00BFFF" height={80} width={80} />
    </div>
  );
};
