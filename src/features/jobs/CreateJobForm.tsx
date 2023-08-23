import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import Select from '../../ui/Select';

import { HolidayData, Job } from '../../types';
import { JobType, WageType } from '../../types/collection';
import { useAddJob } from './useAddJob';
import { useEditJob } from './useEditJob';
import { calculateHours, capitalizeFirstLetter } from '../../utils/helpers';
import { useSettings } from '../settings/useSettings';
import Checkbox from '../../ui/Checkbox';
import { styled } from 'styled-components';
import { useState } from 'react';
import { useUser } from '../authentication/useUser';
import { useJobs } from './useJobs';
import { toast } from 'react-hot-toast';
import { useWages } from '../settings/useWages';

const Box = styled.div`
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 2rem;
`;

type AddJobCalendar = {
  date: string;
};

type CreateJobFormProps = {
  jobToEdit?: JobType | AddJobCalendar;
  onCloseModal?: () => void;
  isCalendar?: boolean;
};

const CreateJobForm = ({
  jobToEdit,
  onCloseModal,
  isCalendar = false,
}: CreateJobFormProps) => {
  const [changeJobRole, setChangeJobRole] = useState(false);
  const { jobs } = useJobs();
  const { isAdding, addJob } = useAddJob();
  const { isEditing, editJob } = useEditJob();
  const { settings } = useSettings();
  const { wages } = useWages();
  const { user } = useUser();
  const isWorking = isAdding || isEditing;
  const { id: editId, ...editValues } = (jobToEdit as JobType) ?? {};

  // check if form is used for editing or adding
  const isEditSession = Boolean(editId);

  // check if role from job is equal the current role from settings
  const isRoleEqual =
    jobToEdit && 'role' in jobToEdit && jobToEdit.role === settings?.role;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Job>({
    defaultValues: isEditSession || isCalendar ? editValues : {},
  });
  console.log(wages);

  const onSubmit = (data: Job) => {
    // check if day matches with day of holidays array
    const isHoliday = wages?.some((wage: WageType) => {
      const holidaysData = wage.holidays as HolidayData;
      return data.date ? holidaysData?.dates.includes(data.date) : false;
    });

    // UI doesn't allow date = null anyway
    const year = data.date ? data.date.slice(0, 4) : '';

    // check if settings already exists and holidays array is provided for this year
    if (
      !wages?.some((wage) => wage.year === year) ||
      wages?.some((wage: WageType) => {
        const holidaysData = wage.holidays as HolidayData;
        return wage.year === year && holidaysData.dates.length === 0;
      })
    )
      return toast.error(`First add or complete Settings for ${year}`);

    const currentWage = wages?.find((wage) => wage.year === year);
    if (!currentWage) throw new Error('current wage not available');

    // check if job to edit was already on this date
    const isOldJob = jobToEdit?.date === data.date;

    // check if job already exists on this day if it is not the same job as the one which gets edited
    const jobAlreadyExists = jobs?.find((job) => job.date === data.date);
    if (jobAlreadyExists && !isOldJob)
      return toast.error('Job already exists on this date');

    if (isEditSession) {
      // calculate total hours and night hours
      const { check_in, check_out } = data;
      const { totalHours, nightHours } = calculateHours(
        check_in,
        check_out,
        currentWage?.beginning_night_hours,
        currentWage?.ending_night_hours
      );

      editJob(
        {
          newJobData: {
            ...data,
            project: capitalizeFirstLetter(data.project),
            location: capitalizeFirstLetter(data.location),
            total_hours: totalHours,
            night_hours: nightHours,
            role: changeJobRole
              ? settings?.role ?? ''
              : jobToEdit && 'role' in jobToEdit
              ? jobToEdit.role
              : '',
            is_holiday: isHoliday ?? false,
          },
          id: editId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      if (!user) throw new Error('user not available');
      // calculate total hours and night hours
      const { check_in, check_out } = data;
      const { totalHours, nightHours } = calculateHours(
        check_in,
        check_out,
        currentWage?.beginning_night_hours,
        currentWage?.ending_night_hours
      );
      const dresscode = data?.dresscode.toLowerCase();

      addJob(
        {
          ...data,
          project: capitalizeFirstLetter(data.project),
          location: capitalizeFirstLetter(data.location),
          dresscode,
          total_hours: totalHours,
          night_hours: nightHours,
          role: settings?.role ?? 'jun',
          is_holiday: isHoliday ?? false,
          user_id: user.id,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };

  const selectOpt = [
    { value: 'vest', label: 'Vest' },
    { value: 'suit', label: 'Suit' },
  ];

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label='Dresscode' error={errors.dresscode?.message}>
        <Select
          id='dresscode'
          options={selectOpt}
          defaultValue={'vest'}
          disabled={isWorking}
          {...register('dresscode', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Date' error={errors.date?.message}>
        <Input
          type='date'
          id='date'
          disabled={isWorking}
          // disabled={isEditSession || isWorking}
          {...register('date', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Project' error={errors.project?.message}>
        <Textarea
          id='project'
          maxLength={60}
          disabled={isWorking}
          {...register('project', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Location' error={errors.location?.message}>
        <Textarea
          id='location'
          maxLength={60}
          disabled={isWorking}
          {...register('location', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Check In' error={errors.check_in?.message}>
        <Input
          type='time'
          id='check-in'
          disabled={isWorking}
          {...register('check_in', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Check Out' error={errors.check_out?.message}>
        <Input
          type='time'
          id='check-out'
          disabled={isWorking}
          {...register('check_out', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      {isEditSession && !isRoleEqual && (
        <Box>
          <Checkbox
            onChange={() => setChangeJobRole(!changeJobRole)}
            id='breakfast'
          >
            {`Want to change role to ${
              jobToEdit && 'role' in jobToEdit && jobToEdit.role === 'jun'
                ? 'Senior'
                : 'Junior'
            } for this job?`}
          </Checkbox>
        </Box>
      )}

      <FormRow>
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit job' : 'Add job'}
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateJobForm;
