import { format } from 'date-fns';
import { styled } from 'styled-components';
import { HiTrash } from 'react-icons/hi2';

// Components
import InsertJob from './InsertJob';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

// Hooks
import { useDeleteJob } from '../jobs/useDeleteJob';

// Context
import { useCalendar } from '../../context/CalenderContext';

// Helpers
import { isDayHoliday } from '../../utils/helpers';

// Types
import { HolidayData } from '../../types';
import { JobType, WageType } from '../../types/collection';

type StyledDayProps = {
  isHoliday: boolean | undefined;
};

type StyledDayCellProps = {
  mark: boolean | undefined;
};

type StyledJobLabelProps = {
  isSuit: boolean | undefined;
};

const StyledDay = styled.div<StyledDayProps>`
  display: flex;
  flex-direction: column;
  color: var(--color-grey-600);
  height: 13rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 0.5rem;
  overflow: hidden;

  ${({ isHoliday }) =>
    isHoliday &&
    `
    color: var(--color-text-holiday-red);
    background-color: var(--color-holiday-red);
  `};

  /* iPad Mini */
  @media (max-width: 1024px) {
    height: 10rem;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  padding: 0.5rem 0.5rem 0 0.5rem;

  flex-direction: column;
  justify-items: center;
`;

const StyledDayHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledDayCell = styled.div<StyledDayCellProps>`
  ${({ mark }) =>
    mark &&
    `
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-currentDay);
    color: var(--color-text-currentDay);
    border-radius: 9999px;
    width: 2.8rem;
    height: 2.8rem;
  `}
`;

const StyledBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const StyledButton = styled.div`
  z-index: 1000;
  height: 100%;
  width: 100%;
`;

const StyledJobLabel = styled.span<StyledJobLabelProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.3rem;
  color: var(--color-grey-50);
  font-size: 1.4rem;
  border-radius: 0.4rem;

  ${({ isSuit }) =>
    isSuit
      ? `
    background-color: var(--color-blue-700);
  `
      : 'background-color: var(--color-brand-600);'}
`;

const DeleteIcon = styled.span<StyledDayProps>`
  margin-top: 0.2rem;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  cursor: pointer;

  ${({ isHoliday }) =>
    isHoliday &&
    `
    color: var(--color-text-holiday-red);
  `}
`;

type DayProps = {
  day: Date;
  rowIdx: number;
  job: JobType | undefined;
  wages: WageType[];
};

const getCurrentDayClass = (day: Date) => {
  return format(day, 'dd-MM-yy') === format(new Date(), 'dd-MM-yy');
};

const Day = ({ day, rowIdx, job, wages }: DayProps) => {
  const { setDaySelected } = useCalendar();
  const { isDeleting, deleteJob } = useDeleteJob();
  const markToday = getCurrentDayClass(day);

  // for holdays
  const year = day.getFullYear();
  const currentWage = wages?.find((wage) => wage.year === year?.toString());

  // typescript helper
  const holidaysData = currentWage?.holidays as HolidayData;
  const isHoliday = isDayHoliday(day, holidaysData);

  // check if dresscode is suit on this day
  const isSuit = job?.dresscode === 'suit';

  return (
    <StyledDay isHoliday={isHoliday}>
      <StyledHeader>
        {rowIdx === 0 && <p>{format(day, 'eee')}</p>}
        <StyledDayHeader>
          <StyledDayCell mark={markToday ? markToday : undefined}>
            {format(day, 'dd')}
          </StyledDayCell>
          {job && (
            <Modal>
              <Modal.Open opens='delete'>
                <DeleteIcon isHoliday={isHoliday}>
                  <HiTrash />
                </DeleteIcon>
              </Modal.Open>
              <Modal.Window name='delete'>
                <ConfirmDelete
                  resourceName='job'
                  disabled={isDeleting}
                  onConfirm={() => deleteJob(job?.id)}
                />
              </Modal.Window>
            </Modal>
          )}
        </StyledDayHeader>
      </StyledHeader>
      <StyledBody
        style={{}}
        onClick={() => {
          setDaySelected(day);
        }}
      >
        {job && <StyledJobLabel isSuit={isSuit}>{job.project}</StyledJobLabel>}

        <InsertJob button={<StyledButton />} jobToEdit={job} />
      </StyledBody>
    </StyledDay>
  );
};

export default Day;
