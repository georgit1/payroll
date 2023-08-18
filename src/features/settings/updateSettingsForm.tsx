import { useRef } from 'react';
import { SettingsType } from '../../types/collection';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';
import { extractDataFromCsv } from '../../utils/helpers';
import { styled } from 'styled-components';
import Modal from '../../ui/Modal';
import { HiOutlineInformationCircle } from 'react-icons/hi2';
import HolidayInfo from './HolidayInfo';

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const Info = styled.span`
  font-size: 1.4rem;
  color: var(--color-green-700);
`;

const UpdateSettingsForm = () => {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // typescrpt helper
  const holidaysData = settings?.holidays as {
    fileName: string;
    dates: string[];
  };

  const isEmptyFile = holidaysData?.dates.length === 0;
  const currentFileName = holidaysData?.fileName;

  if (isLoading) return <Spinner />;

  async function handleUpdate(
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
    field: Partial<keyof SettingsType>
  ) {
    const { value } = e.target;

    // dont update if no value or value hasn't changed
    if (
      !value ||
      settings?.[field] === value ||
      settings?.[field] === Number(value)
    )
      return;

    // If the field is 'holidays', parse the CSV data to extract dates before updating
    if (field === 'holidays') {
      if (e.target instanceof HTMLInputElement) {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
          const dates = await extractDataFromCsv(selectedFile);
          updateSetting({ [field]: dates });
        }
      }
    } else {
      updateSetting({ [field]: value });
    }
  }

  const selectOpt = [
    { value: 'jun', label: 'Junior' },
    { value: 'sen', label: 'Senior' },
  ];

  return (
    <Form>
      <FormRow label='Junior/Senior'>
        <Select
          id='role'
          options={selectOpt}
          defaultValue={settings?.role === 'jun' ? 'jun' : 'sen'}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLSelectElement>) =>
            handleUpdate(e, 'role')
          }
        />
      </FormRow>

      <FormRow label='Vest Junior €/hour'>
        <Input
          type='number'
          id='vest-jun'
          defaultValue={settings?.vest_jun}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'vest_jun')
          }
        />
      </FormRow>

      <FormRow label='Vest Junior Night €/hour'>
        <Input
          type='number'
          id='vest-jun-night'
          defaultValue={settings?.vest_jun_night}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'vest_jun_night')
          }
        />
      </FormRow>

      <FormRow label='Vest Senior €/hour'>
        <Input
          type='number'
          id='vest-sen'
          defaultValue={settings?.vest_sen}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'vest_sen')
          }
        />
      </FormRow>

      <FormRow label='Vest Senior Night €/hour'>
        <Input
          type='number'
          id='vest-sen-night'
          defaultValue={settings?.vest_sen_night}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'vest_sen_night')
          }
        />
      </FormRow>

      <FormRow label='Suit Junior €/hour'>
        <Input
          type='number'
          id='suit-jun'
          defaultValue={settings?.suit_jun}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'suit_jun')
          }
        />
      </FormRow>

      <FormRow label='Suit Junior Night €/hour'>
        <Input
          type='number'
          id='suit-jun-night'
          defaultValue={settings?.suit_jun_night}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'suit_jun_night')
          }
        />
      </FormRow>

      <FormRow label='Suit Senior €/hour'>
        <Input
          type='number'
          id='suit-sen'
          defaultValue={settings?.suit_sen}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'suit_sen')
          }
        />
      </FormRow>

      <FormRow label='Suit Senior Night €/hour'>
        <Input
          type='number'
          id='suit-sen-night'
          defaultValue={settings?.suit_sen_night}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'suit_sen_night')
          }
        />
      </FormRow>

      {/* //////////////////////////////////// */}
      <FormRow label='Vest Junior Holiday €/hour'>
        <Input
          type='number'
          id='vest-jun-holiday'
          defaultValue={settings?.vest_jun_holiday}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'vest_jun_holiday')
          }
        />
      </FormRow>

      <FormRow label='Vest Junior Night Holiday €/hour'>
        <Input
          type='number'
          id='vest-jun-night-holiday'
          defaultValue={settings?.vest_jun_night_holiday}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'vest_jun_night_holiday')
          }
        />
      </FormRow>

      <FormRow label='Vest Senior Holiday €/hour'>
        <Input
          type='number'
          id='vest-sen-holiday'
          defaultValue={settings?.vest_sen_holiday}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'vest_sen_holiday')
          }
        />
      </FormRow>

      <FormRow label='Vest Senior Night Holiday €/hour'>
        <Input
          type='number'
          id='vest-sen-night-holiday'
          defaultValue={settings?.vest_sen_night_holiday}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'vest_sen_night_holiday')
          }
        />
      </FormRow>

      <FormRow label='Suit Junior Holiday €/hour'>
        <Input
          type='number'
          id='suit-jun-holiday'
          defaultValue={settings?.suit_jun_holiday}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'suit_jun_holiday')
          }
        />
      </FormRow>

      <FormRow label='Suit Junior Night Holiday €/hour'>
        <Input
          type='number'
          id='suit-jun-night-holiday'
          defaultValue={settings?.suit_jun_night_holiday}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'suit_jun_night_holiday')
          }
        />
      </FormRow>

      <FormRow label='Suit Senior Holiday €/hour'>
        <Input
          type='number'
          id='suit-sen-holiday'
          defaultValue={settings?.suit_sen_holiday}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'suit_sen_holiday')
          }
        />
      </FormRow>

      <FormRow label='Suit Senior Night Holiday €/hour'>
        <Input
          type='number'
          id='suit-sen-night'
          defaultValue={settings?.suit_sen_night_holiday}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'suit_sen_night_holiday')
          }
        />
      </FormRow>
      {/* //////////////////////////////////// */}

      <FormRow label='Night Allowance'>
        <Input
          type='number'
          id='night-allowance'
          defaultValue={settings?.night_allowance}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'night_allowance')
          }
        />
      </FormRow>

      <FormRow label='Holiday Compensation'>
        <Input
          type='number'
          id='holiday-compensation'
          defaultValue={settings?.holiday_compensation}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'holiday_compensation')
          }
        />
      </FormRow>

      <FormRow label='Beginning Night Hours'>
        <Input
          type='time'
          id='beginning-night-hours'
          defaultValue={settings?.beginning_night_hours}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'beginning_night_hours')
          }
        />
      </FormRow>

      <FormRow label='Ending Night Hours'>
        <Input
          type='time'
          id='ending-night-hours'
          defaultValue={settings?.ending_night_hours}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'ending_night_hours')
          }
        />
      </FormRow>

      <FormRow label='Insignificance Limit'>
        <Input
          type='number'
          id='insignificance_limit'
          defaultValue={settings?.insignificance_limit}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'insignificance_limit')
          }
        />
      </FormRow>

      <Modal>
        <FormRow
          label='Holidays'
          labelIcon={
            <Modal.Open opens='info'>
              <span>
                <HiOutlineInformationCircle />
              </span>
            </Modal.Open>
          }
        >
          <Modal.Window name='info'>
            <HolidayInfo />
          </Modal.Window>
          <FileInput
            id='holidays'
            accept='.csv'
            disabled={isUpdating}
            ref={fileInputRef}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
              handleUpdate(e, 'holidays')
            }
          />
          <>
            {isEmptyFile && (
              <Error>
                No file or empty file uploaded. Choose a .csv file for an
                accurate calculation of the public holidays.
              </Error>
            )}
            {currentFileName && !isEmptyFile && (
              <Info>Current File: {currentFileName}</Info>
            )}
          </>
        </FormRow>
      </Modal>
    </Form>
  );
};

export default UpdateSettingsForm;
