import LoadingRows from '@/components/LoadingRows';
import NumberText from '@/components/NumberText';

type BalanceTotalProps = {
  formattedNumber?: string;
  isLoading: boolean;
};

const BalanceTotal = ({ formattedNumber, isLoading }: BalanceTotalProps) => {
  return isLoading ? (
    <LoadingRows color="on_primary" fontClassName="Font_data_32px_num" />
  ) : (
    <NumberText color="on_primary" size="xl" type="small_fractions" formattedNumber={formattedNumber} animate />
  );
};

export default BalanceTotal;
