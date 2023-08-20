import { JobType, SettingsType } from '../../types/collection';
import { styled } from 'styled-components';

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  /* background-color: var(--color-blue-100); */

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledResultRow = styled(CommonRow)`
  background-color: var(--color-result-row);
  padding: 1.2rem 2.4rem;
  font-weight: 700;
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

type PayrollJobTableProps = {
  jobs: JobType[];
  settings: SettingsType;
};

type Role = 'jun' | 'sen';
type Dresscode = 'vest' | 'suit';

const PayrollCalculationTable = ({ jobs, settings }: PayrollJobTableProps) => {
  const calculateHoursAndAmounts = (
    role: Role,
    dresscode: Dresscode,
    isHoliday: boolean = false
  ) => {
    const filteredJobs = jobs.filter(
      (job) =>
        job.dresscode === dresscode &&
        job.role === role &&
        job.is_holiday === isHoliday
    );

    const totalHours = filteredJobs.reduce(
      (sum, cur) => sum + cur.total_hours,
      0
    );
    const nightHours = filteredJobs.reduce(
      (sum, cur) => sum + cur.night_hours,
      0
    );
    const dayHours = totalHours - nightHours;

    let dayRate;
    let nightRate;
    let amountDaySurcharge = 0;
    let amountNightSurcharge = 0;

    if (!isHoliday) {
      dayRate = settings[`${dresscode}_${role}`];
      nightRate = settings[`${dresscode}_${role}_night`];
    }

    if (isHoliday) {
      dayRate = settings[`${dresscode}_${role}_holiday`];
      nightRate = settings[`${dresscode}_${role}_night_holiday`];
    }

    if (dayRate === undefined || nightRate === undefined) {
      throw new Error('Missing dayRate or nightRate value');
    }

    const amountDayHours = dayRate * dayHours;
    const amountNightHours = nightRate * nightHours;

    if (isHoliday) {
      amountDaySurcharge = totalHours * dayRate;
      amountNightSurcharge = nightHours * settings.night_holiday_surcharge;
    }

    return {
      totalHours,
      nightHours,
      dayHours,
      amountDayHours,
      amountNightHours,
      ...(isHoliday && { amountDaySurcharge, amountNightSurcharge }),
    };
  };

  const junVestData = calculateHoursAndAmounts('jun', 'vest');
  const junSuitData = calculateHoursAndAmounts('jun', 'suit');

  const senVestData = calculateHoursAndAmounts('sen', 'vest');
  const senSuitData = calculateHoursAndAmounts('sen', 'suit');

  const junVestHolidayData = calculateHoursAndAmounts('jun', 'vest', true);
  const junSuitHolidayData = calculateHoursAndAmounts('jun', 'suit', true);

  const senVestHolidayData = calculateHoursAndAmounts('sen', 'vest', true);
  const senSuitHolidayData = calculateHoursAndAmounts('sen', 'suit', true);

  // holiday calculation
  const amountVestJunHolidaySurcharge =
    junVestHolidayData.totalHours * settings.vest_jun_holiday +
    junVestHolidayData.nightHours * settings.night_allowance;

  const amountVestSenHolidaySurcharge =
    senVestHolidayData.totalHours * settings.vest_sen_holiday +
    senVestHolidayData.nightHours * settings.night_allowance;

  const amountSuitJunHolidaySurcharge =
    junSuitHolidayData.totalHours * settings.suit_jun_holiday +
    junSuitHolidayData.nightHours * settings.night_allowance;

  const amountSuitSenHolidaySurcharge =
    senSuitHolidayData.totalHours * settings.suit_sen_holiday +
    senSuitHolidayData.nightHours * settings.night_allowance;

  // night allowance
  const totalHoursNightAllowance =
    junVestData.nightHours +
    junSuitData.nightHours +
    senVestData.nightHours +
    senSuitData.nightHours +
    junVestHolidayData.nightHours +
    junSuitHolidayData.nightHours +
    senVestHolidayData.nightHours +
    senSuitHolidayData.nightHours;

  const amountNightAllowance =
    totalHoursNightAllowance * settings.night_allowance;

  // holiday compensation
  const totalHoursHolidayCompenastion =
    junVestData.totalHours +
    junSuitData.totalHours +
    senVestData.totalHours +
    senSuitData.totalHours +
    junVestHolidayData.totalHours +
    junSuitHolidayData.totalHours +
    senVestHolidayData.totalHours +
    senSuitHolidayData.totalHours;

  const amountHolidayCompensation =
    totalHoursHolidayCompenastion * settings.holiday_compensation;

  // total amount
  const totalAmount =
    junVestData.amountDayHours +
    junVestData.amountNightHours +
    junSuitData.amountDayHours +
    junSuitData.amountNightHours +
    senVestData.amountDayHours +
    senVestData.amountNightHours +
    senSuitData.amountDayHours +
    senSuitData.amountNightHours +
    junVestHolidayData.amountDayHours +
    junVestHolidayData.amountNightHours +
    senVestHolidayData.amountDayHours +
    senVestHolidayData.amountNightHours +
    junSuitHolidayData.amountDayHours +
    junSuitHolidayData.amountNightHours +
    senSuitHolidayData.amountDayHours +
    senSuitHolidayData.amountNightHours +
    amountVestJunHolidaySurcharge +
    amountVestSenHolidaySurcharge +
    amountSuitJunHolidaySurcharge +
    amountSuitSenHolidaySurcharge +
    amountNightAllowance +
    amountHolidayCompensation;

  return (
    <StyledTable role='table'>
      <StyledHeader role='row' as='header'>
        <div>designation</div>
        <div>quantity(h)</div>
        <div>rate</div>
        <div>amount(€)</div>
      </StyledHeader>
      <StyledBody>
        {junVestData.totalHours !== 0 && (
          <>
            <StyledRow role='row'>
              <div>Sec FW jun T</div>
              <div>{junVestData.dayHours.toFixed(2)}</div>
              <div>{settings.vest_jun}</div>
              <div>{junVestData.amountDayHours.toFixed(2)}</div>
            </StyledRow>
            <StyledRow role='row'>
              <div>Sec FW jun N</div>
              <div>{junVestData.nightHours.toFixed(2)}</div>
              <div>{settings.vest_jun_night}</div>
              <div>{junVestData.amountNightHours.toFixed(2)}</div>
            </StyledRow>
          </>
        )}
        {junSuitData.totalHours !== 0 && (
          <>
            <StyledRow role='row'>
              <div>Sec Anz FW jun T</div>
              <div>{junSuitData.dayHours.toFixed(2)}</div>
              <div>{settings.suit_jun}</div>
              <div>{junSuitData.amountDayHours.toFixed(2)}</div>
            </StyledRow>
            <StyledRow role='row'>
              <div>Sec Anz FW jun N</div>
              <div>{junSuitData.nightHours.toFixed(2)}</div>
              <div>{settings.suit_jun_night}</div>
              <div>{junSuitData.amountNightHours.toFixed(2)}</div>
            </StyledRow>
          </>
        )}
        {senVestData.totalHours !== 0 && (
          <>
            <StyledRow role='row'>
              <div>Sec FW sen T</div>
              <div>{senVestData.dayHours.toFixed(2)}</div>
              <div>{settings.vest_sen}</div>
              <div>{senVestData.amountDayHours.toFixed(2)}</div>
            </StyledRow>
            <StyledRow role='row'>
              <div>Sec FW sen N</div>
              <div>{senVestData.nightHours.toFixed(2)}</div>
              <div>{settings.vest_sen_night}</div>
              <div>{senVestData.amountNightHours.toFixed(2)}</div>
            </StyledRow>
          </>
        )}
        {senSuitData.totalHours !== 0 && (
          <>
            <StyledRow role='row'>
              <div>Sec Anz FW sen T</div>
              <div>{senSuitData.dayHours.toFixed(2)}</div>
              <div>{settings.suit_sen}</div>
              <div>{senSuitData.amountDayHours.toFixed(2)}</div>
            </StyledRow>
            <StyledRow role='row'>
              <div>Sec Anz FW sen N</div>
              <div>{senSuitData.nightHours.toFixed(2)}</div>
              <div>{settings.suit_sen_night}</div>
              <div>{senSuitData.amountNightHours.toFixed(2)}</div>
            </StyledRow>
          </>
        )}
        {junVestHolidayData.totalHours !== 0 && (
          <>
            <StyledRow role='row'>
              <div>Sec FW jun T Hol</div>
              <div>{junVestHolidayData.dayHours.toFixed(2)}</div>
              <div>{settings.vest_jun_holiday}</div>
              <div>{junVestHolidayData.amountDayHours.toFixed(2)}</div>
            </StyledRow>
            <StyledRow role='row'>
              <div>Sec FW jun N Hol</div>
              <div>{junVestHolidayData.nightHours.toFixed(2)}</div>
              <div>{settings.vest_jun_night_holiday}</div>
              <div>{junVestHolidayData.amountNightHours.toFixed(2)}</div>
            </StyledRow>
            <StyledRow role='row'>
              <div>Sec hol surcharge jun T</div>
              <div>{junVestHolidayData.totalHours.toFixed(2)}</div>
              <div>{settings.vest_jun_holiday}</div>
              <div>{junVestHolidayData.amountDaySurcharge!.toFixed(2)}</div>
            </StyledRow>
            <StyledRow role='row'>
              <div>Sec hol surcharge jun N</div>
              <div>{junVestHolidayData.nightHours.toFixed(2)}</div>
              <div>{settings.night_holiday_surcharge}</div>
              <div>{junVestHolidayData.amountNightSurcharge!.toFixed(2)}</div>
            </StyledRow>
          </>
        )}
        {senVestHolidayData.totalHours !== 0 && (
          <>
            <StyledRow role='row'>
              <div>Sec FW sen T Hol</div>
              <div>{senVestHolidayData.dayHours.toFixed(2)}</div>
              <div>{settings.vest_sen_holiday}</div>
              <div>{senVestHolidayData.amountDayHours.toFixed(2)}</div>
            </StyledRow>
            <StyledRow role='row'>
              <div>Sec FW sen N Hol</div>
              <div>{senVestHolidayData.nightHours.toFixed(2)}</div>
              <div>{settings.vest_sen_night_holiday}</div>
              <div>{senVestHolidayData.amountNightHours.toFixed(2)}</div>
            </StyledRow>
            <StyledRow role='row'>
              <div>Sec hol surcharge sen T</div>
              <div>{senVestHolidayData.totalHours.toFixed(2)}</div>
              <div>{settings.vest_sen_holiday}</div>
              <div>{senVestHolidayData.amountDaySurcharge!.toFixed(2)}</div>
            </StyledRow>
            <StyledRow role='row'>
              <div>Sec hol surcharge sen N</div>
              <div>{senVestHolidayData.nightHours.toFixed(2)}</div>
              <div>{settings.night_holiday_surcharge}</div>
              <div>{senVestHolidayData.amountNightSurcharge!.toFixed(2)}</div>
            </StyledRow>
          </>
        )}
        {junSuitHolidayData.totalHours !== 0 && (
          <>
            <StyledRow role='row'>
              <div>Sec Anz FW jun T Hol</div>
              <div>{junSuitHolidayData.dayHours.toFixed(2)}</div>
              <div>{settings.suit_jun_holiday}</div>
              <div>{junSuitHolidayData.amountDayHours.toFixed(2)}</div>
            </StyledRow>
            <StyledRow role='row'>
              <div>Sec Anz FW jun N Hol</div>
              <div>{junSuitHolidayData.nightHours.toFixed(2)}</div>
              <div>{settings.suit_jun_night_holiday}</div>
              <div>{junSuitHolidayData.amountNightHours.toFixed(2)}</div>
            </StyledRow>
            <StyledRow role='row'>
              <div>Sec Anz hol surcharge jun T</div>
              <div>{junSuitHolidayData.totalHours.toFixed(2)}</div>
              <div>{settings.suit_jun_holiday}</div>
              <div>{junSuitHolidayData.amountDaySurcharge!.toFixed(2)}</div>
            </StyledRow>
            <StyledRow role='row'>
              <div>Sec Anz hol surcharge jun N</div>
              <div>{junSuitHolidayData.nightHours.toFixed(2)}</div>
              <div>{settings.night_holiday_surcharge}</div>
              <div>{junSuitHolidayData.amountNightSurcharge!.toFixed(2)}</div>
            </StyledRow>
          </>
        )}
        {senSuitHolidayData.totalHours !== 0 && (
          <>
            <StyledRow role='row'>
              <div>Sec Anz FW sen T Hol</div>
              <div>{senSuitHolidayData.dayHours.toFixed(2)}</div>
              <div>{settings.suit_sen_holiday}</div>
              <div>{senSuitHolidayData.amountDayHours.toFixed(2)}</div>
            </StyledRow>
            <StyledRow role='row'>
              <div>Sec Anz FW sen N Hol</div>
              <div>{senSuitHolidayData.nightHours.toFixed(2)}</div>
              <div>{settings.suit_sen_night_holiday}</div>
              <div>{senSuitHolidayData.amountNightHours.toFixed(2)}</div>
            </StyledRow>
            <StyledRow role='row'>
              <div>Sec Anz hol surcharge sen T</div>
              <div>{senSuitHolidayData.totalHours.toFixed(2)}</div>
              <div>{settings.suit_sen_holiday}</div>
              <div>{senSuitHolidayData.amountDaySurcharge!.toFixed(2)}</div>
            </StyledRow>
            <StyledRow role='row'>
              <div>Sec Anz hol surcharge sen N</div>
              <div>{senSuitHolidayData.nightHours.toFixed(2)}</div>
              <div>{settings.night_holiday_surcharge}</div>
              <div>{senSuitHolidayData.amountNightSurcharge!.toFixed(2)}</div>
            </StyledRow>
          </>
        )}
        <StyledRow role='row'>
          <div>Night Allowance</div>
          <div>{totalHoursNightAllowance.toFixed(2)}</div>
          <div>{settings.night_allowance}</div>
          <div>{amountNightAllowance.toFixed(2)}</div>
        </StyledRow>
        <StyledRow role='row'>
          <div>Holiday Compensation</div>
          <div>{totalHoursHolidayCompenastion.toFixed(2)}</div>
          <div>{settings.holiday_compensation}</div>
          <div>{amountHolidayCompensation.toFixed(2)}</div>
        </StyledRow>
        <StyledResultRow role='row'>
          <div>Total</div>
          <div></div>
          <div></div>
          <div>{totalAmount.toFixed(2)}</div>
        </StyledResultRow>
      </StyledBody>
    </StyledTable>
  );
};

export default PayrollCalculationTable;
