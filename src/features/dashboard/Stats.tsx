import { HiOutlineAcademicCap, HiOutlineBanknotes } from 'react-icons/hi2';
import { AiOutlinePercentage } from 'react-icons/ai';
import { GiPayMoney } from 'react-icons/gi';
import Stat from '../../ui/Stat';
import { Job } from '../../types';

type StatsProps = {
  jobs: Job[];
};

const Stats = ({ jobs }: StatsProps) => {
  return (
    <>
      <Stat
        title='annual income'
        color='blue'
        icon={<HiOutlineBanknotes />}
        value={17}
      />
      <Stat
        title='% of annual limit'
        color='green'
        icon={<AiOutlinePercentage />}
        value={17}
      />
      <Stat
        title='annual back pay'
        color='indigo'
        icon={<GiPayMoney />}
        value={17}
      />
      <Stat
        title='Test'
        color='yellow'
        icon={<HiOutlineAcademicCap />}
        value={17}
      />
    </>
  );
};

export default Stats;
