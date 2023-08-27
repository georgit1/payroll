import { styled } from 'styled-components';
import { capitalizeFirstLetter } from '../../utils/helpers';
import { WageDataHoliday } from '../../types';

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.6fr 0.6fr 0.8fr;
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  color: var(--color-holiday-font-red);

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

type HolidayCalculationBlockType = {
  wageData: WageDataHoliday;
};

const HolidayCalculationBlock = ({ wageData }: HolidayCalculationBlockType) => {
  const role = capitalizeFirstLetter(wageData.role);
  const dresscode = capitalizeFirstLetter(wageData.dresscode);

  return (
    <>
      <StyledRow role='row'>
        <div>
          Holiday {dresscode} {role} Day
        </div>
        <div>{wageData.dayHours.toFixed(2)}</div>
        <div>{wageData.hourlyRateDay}</div>
        <div>{wageData.amountDay.toFixed(2)}</div>
      </StyledRow>
      <StyledRow role='row'>
        <div>
          Holiday {dresscode} {role} Night
        </div>
        <div>{wageData.nightHours.toFixed(2)}</div>
        <div>{wageData.hourlyRateNight}</div>
        <div>{wageData.amountNight.toFixed(2)}</div>
      </StyledRow>
      <StyledRow role='row'>
        <div>
          Holiday Surcharge {dresscode} {role} Total
        </div>
        <div>{wageData.totalHours.toFixed(2)}</div>
        <div>{wageData.hourlyRateDay}</div>
        <div>{wageData.amountHolidaySurchargeTotalHours.toFixed(2)}</div>
      </StyledRow>
      <StyledRow role='row'>
        <div>
          Holiday Surcharge {dresscode} {role} Night
        </div>
        <div>{wageData.nightHours.toFixed(2)}</div>
        <div>{wageData.nightAllowanceRate}</div>
        <div>{wageData.amountHolidaySurchargeNightHours.toFixed(2)}</div>
      </StyledRow>
      <StyledRow role='row'>
        <div>
          Holiday Compensation {dresscode} {role} Day
        </div>
        <div>{wageData.dayHours.toFixed(2)}</div>
        <div>{wageData.holidayCompensationRateDay.toFixed(2)}</div>
        <div>{wageData.amountHolidayCompensationDay.toFixed(2)}</div>
      </StyledRow>
      <StyledRow role='row'>
        <div>
          Holiday Compensation {dresscode} {role} Night
        </div>
        <div>{wageData.nightHours.toFixed(2)}</div>
        <div>{wageData.holidayCompensationRateNight.toFixed(2)}</div>
        <div>{wageData.amountHolidayCompensationNight.toFixed(2)}</div>
      </StyledRow>
    </>
  );
};

export default HolidayCalculationBlock;
