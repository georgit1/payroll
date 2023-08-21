import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import Select from '../../ui/Select';

import { Job } from '../../types';
import { JobType } from '../../types/collection';
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
  const { user } = useUser();
  const isWorking = isAdding || isEditing;
  const { id: editId, ...editValues } = (jobToEdit as JobType) ?? {};

  // helper for typescript
  const holidaysData = settings?.holidays as {
    fileName: string;
    dates: string[];
  };

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

  const onSubmit = (data: Job) => {
    // check if day matches witch holidays
    const isHoliday = holidaysData?.dates.includes(data.date);

    if (isEditSession) {
      if (!settings) throw new Error('settings not available');

      // prevent to set more than one job on same date
      const jobWithSameDate = jobs?.find((job) => job.date === data.date);
      if (jobWithSameDate)
        return toast.error('Job already exists on this date');

      // calculate total hours and night hours
      const { check_in, check_out } = data;
      const { totalHours, nightHours } = calculateHours(
        check_in,
        check_out,
        settings?.beginning_night_hours,
        settings?.ending_night_hours
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
              ? settings.role
              : jobToEdit && 'role' in jobToEdit
              ? jobToEdit.role
              : '',
            is_holiday: isHoliday,
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
      if (!settings) throw new Error('settings not available');
      if (!user) throw new Error('user not available');

      // prevent to set more than one job on same date
      const jobWithSameDate = jobs?.find((job) => job.date === data.date);
      if (jobWithSameDate)
        return toast.error('Job already exists on this date');

      // calculate total hours and night hours
      const { check_in, check_out } = data;
      const { totalHours, nightHours } = calculateHours(
        check_in,
        check_out,
        settings?.beginning_night_hours,
        settings?.ending_night_hours
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
          role: settings.role,
          is_holiday: isHoliday,
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
