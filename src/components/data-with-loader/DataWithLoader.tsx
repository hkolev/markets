import { CircularProgress } from '@material-ui/core';

interface IDataWithLoader {
  isLoading: boolean;
  data: any;
}

export const DataWithLoader: React.FC<IDataWithLoader> = ({
  isLoading,
  data,
}) => {
  return <>{isLoading ? <CircularProgress size={15} /> : data}</>;
};
