import { useEffect, useRef, useState } from 'react';
import { SettingsType, WageType } from '../../types/collection';
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
import { useWage } from './useWage';
import { useUpdateWage } from './useUpdateWage';
import Button from '../../ui/Button';
import { useAddWage } from './useAddWage';
import { defaultWage } from '../../data/data-defaultValues';
import { toast } from 'react-hot-toast';
import { useYear } from '../../context/YearContext';

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const Info = styled.span`
  font-size: 1.4rem;
  color: var(--color-green-700);
`;

const UpdateSettingsForm = () => {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [newYear, setNewYear] = useState('');
  const [selectOptYear, setSelectOptYear] = useState<
    { value: string; label: string }[] | null
  >(null);
  const [yearError, setYearError] = useState('');

  // context
  const { setYear } = useYear();

  const { isLoading: isLoading1, settings } = useSettings();
  const { isUpdating: isUpdatingSettings, updateSetting } = useUpdateSetting();
  const { isUpdating: isUpdatingWage, updateWage } =
    useUpdateWage(selectedYear);

  const { isLoading: isLoading2, wage } = useWage(selectedYear);
  const { addWage, isAdding } = useAddWage();

  const fileInputRef = useRef<HTMLInputElement>(null);
  // const yearInputRef = useRef<HTMLInputElement>(null);

  const currentWage = wage?.find((wage) => wage.year === selectedYear);
  const yearsCollection = wage?.map((item) => item.year);

  const isUpdating = isUpdatingSettings || isUpdatingWage;

  // set the selectOptions as soon as they get received from the database
  useEffect(() => {
    if (yearsCollection) {
      const mappedOptions = yearsCollection.map((year) => ({
        value: year,
        label: year,
      }));

      // Sort the years in descending order
      mappedOptions.sort((a, b) => b.value.localeCompare(a.value));

      // Check if selectOptYear is different before updating it
      if (
        !selectOptYear ||
        JSON.stringify(mappedOptions) !== JSON.stringify(selectOptYear)
      ) {
        setSelectOptYear(mappedOptions);
      }
    }
  }, [yearsCollection, selectOptYear]);

  if (isLoading1 || isLoading2) return <Spinner />;

  // typescrpt helper
  // const holidaysData = settings?.holidays as {
  //   fileName: string;
  //   dates: string[];
  // };

  // typescrpt helper
  const holidaysData = currentWage?.holidays as {
    fileName: string;
    dates: string[];
  };

  const isEmptyFile = holidaysData?.dates.length === 0;
  const currentFileName = holidaysData?.fileName;

  // Function to handle updating settings values
  async function handleUpdateSetting(
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

  const handleAddYear = () => {
    setYearError('');

    if (!newYear) return;

    if (newYear.length !== 4) {
      setYearError('Year must have 4 characters');
      return;
    }

    if (yearsCollection?.includes(newYear))
      return toast.error('Year already exists.');

    const newSelectOption = { value: newYear, label: newYear };
    setSelectOptYear([...(selectOptYear ?? []), newSelectOption]);
    setSelectedYear(newYear);
    setNewYear('');

    addWage({ ...defaultWage, year: newYear });
  };

  // Function to handle updating wage values
  async function handleUpdateWage(
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
    field: Partial<keyof WageType>
  ) {
    const { value } = e.target;

    // dont update if no value or value hasn't changed
    if (
      !value ||
      currentWage?.[field] === value ||
      currentWage?.[field] === Number(value)
    )
      return;

    if (field === 'holidays') {
      if (e.target instanceof HTMLInputElement) {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
          const dates = await extractDataFromCsv(selectedFile);
          updateWage({ [field]: dates });
        }
      }
    } else {
      updateWage({ [field]: value });
    }
  }

  const selectOptRole = [
    { value: 'jun', label: 'Junior' },
    { value: 'sen', label: 'Senior' },
  ];

  return (
    <Form>
      <FormRow label='Junior/Senior'>
        <Select
          id='role'
          options={selectOptRole}
          defaultValue={settings?.role === 'jun' ? 'jun' : 'sen'}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLSelectElement>) =>
            handleUpdateSetting(e, 'role')
          }
        />
      </FormRow>

      <FormRow label='Add year' error={yearError}>
        <Input
          type='number'
          id='new-year-input'
          placeholder='e.g. 2023'
          // value={newYear}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewYear(e.target.value)
          }
        />
        <Button type='button' onClick={handleAddYear}>
          Add New Year
        </Button>
      </FormRow>

      <FormRow label='Year'>
        <Select
          id='year'
          options={selectOptYear || []}
          defaultValue={selectedYear}
          disabled={isUpdating}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedYear(e.target.value);
            setYear(e.target.value);
          }}
        />
      </FormRow>

      <FormRow label='Base Wage'>
        <Input
          type='number'
          id='base-wage'
          defaultValue={currentWage?.base_wage}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'base_wage')
          }
        />
      </FormRow>

      <FormRow label='Overpayment Jun Vest'>
        <Input
          type='number'
          id='overpayment-jun-vest'
          defaultValue={currentWage?.overpayment_jun_vest}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'overpayment_jun_vest')
          }
        />
      </FormRow>

      {/* //////////////////////////////////// */}

      {/* <FormRow label='Night Allowance'>
        <Input
          type='number'
          id='night-allowance'
          defaultValue={settings?.night_allowance}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateSetting(e, 'night_allowance')
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
            handleUpdateSetting(e, 'holiday_compensation')
          }
        />
      </FormRow> */}

      <FormRow label='Beginning Night Hours'>
        <Input
          type='time'
          id='beginning-night-hours'
          defaultValue={settings?.beginning_night_hours}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateSetting(e, 'beginning_night_hours')
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
            handleUpdateSetting(e, 'ending_night_hours')
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
              handleUpdateWage(e, 'holidays')
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
