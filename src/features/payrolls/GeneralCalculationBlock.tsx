import { styled } from 'styled-components';

// Helpers
import { capitalizeFirstLetter } from '../../utils/helpers';

// Types
import { WageDataGeneral } from '../../types';

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.6fr 0.6fr 0.8fr;
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

type GeneralCalculationBlockType = {
  wageData: WageDataGeneral;
};

const GeneralCalculationBlock = ({ wageData }: GeneralCalculationBlockType) => {
  const role = capitalizeFirstLetter(wageData.role);
  const dresscode = capitalizeFirstLetter(wageData.dresscode);

  return (
    <>
      <StyledRow role='row'>
        <div>
          {dresscode} {role} Day
        </div>
        <div>{wageData.dayHours.toFixed(2)}</div>
        <div>{wageData.hourlyRateDay.toFixed(2)}</div>
        <div>{wageData.amountDay.toFixed(2)}</div>
      </StyledRow>
      <StyledRow role='row'>
        <div>
          {dresscode} {role} Night
        </div>
        <div>{wageData.nightHours.toFixed(2)}</div>
        <div>{wageData.hourlyRateNight.toFixed(2)}</div>
        <div>{wageData.amountNight.toFixed(2)}</div>
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

export default GeneralCalculationBlock;
