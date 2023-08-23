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
import { useWages } from './useWages';
import { useUpdateWage } from './useUpdateWage';
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

const AddButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: fit-content;

  font-size: 1.4rem;
  padding: 0.75rem 1.4rem;
  font-weight: 500;

  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  color: var(--color-brand-50);
  background-color: var(--color-brand-600);
  cursor: pointer;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;

  & input {
    display: flex;
    flex-grow: 1;
  }
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

  // const { isLoading: isLoading2, wage } = useWage(selectedYear);
  const { isLoading: isLoading2, wages, refetch: refetchWage } = useWages();
  const { addWage, isAdding } = useAddWage();

  const fileInputRef = useRef<HTMLInputElement>(null);
  // const yearInputRef = useRef<HTMLInputElement>(null);

  const currentWage = wages?.find((wage) => wage.year === selectedYear);
  const yearsCollection = wages?.map((item) => item.year);

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

    updateSetting({ [field]: value });

    // If the field is 'holidays', parse the CSV data to extract dates before updating
    // if (field === 'holidays') {
    //   if (e.target instanceof HTMLInputElement) {
    //     const selectedFile = e.target.files?.[0];
    //     if (selectedFile) {
    //       const dates = await extractDataFromCsv(selectedFile);
    //       updateSetting({ [field]: dates });
    //     }
    //   }
    // } else {
    //   updateSetting({ [field]: value });
    // }
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
    setSelectedYear(newYear);
    setSelectOptYear([...(selectOptYear ?? []), newSelectOption]);
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
    <Form key={selectedYear}>
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
        <Wrapper>
          <Input
            type='number'
            id='new-year-input'
            placeholder='e.g. 2023'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewYear(e.target.value)
            }
          />
          <AddButton onClick={handleAddYear}>Add Year</AddButton>
        </Wrapper>
      </FormRow>

      <FormRow label='Year'>
        <Select
          key={selectedYear}
          id='year'
          options={selectOptYear || []}
          // defaultValue={selectedYear}
          defaultValue={currentWage?.year}
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

      <FormRow label='Overpayment Jun Vest Night'>
        <Input
          type='number'
          id='overpayment-jun-vest-night'
          defaultValue={currentWage?.overpayment_jun_vest_night}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'overpayment_jun_vest_night')
          }
        />
      </FormRow>

      <FormRow label='Overpayment Jun Vest Holiday'>
        <Input
          type='number'
          id='overpayment-jun-vest-holiday'
          defaultValue={currentWage?.overpayment_jun_vest_holiday}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'overpayment_jun_vest_holiday')
          }
        />
      </FormRow>

      <FormRow label='Overpayment Jun Vest Night Holiday'>
        <Input
          type='number'
          id='overpayment-jun-vest-night-holiday'
          defaultValue={currentWage?.overpayment_jun_vest_night_holiday}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'overpayment_jun_vest_night_holiday')
          }
        />
      </FormRow>

      <FormRow label='Overpayment Jun Suit'>
        <Input
          type='number'
          id='overpayment-jun-suit'
          defaultValue={currentWage?.overpayment_jun_suit}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'overpayment_jun_suit')
          }
        />
      </FormRow>

      <FormRow label='Overpayment Jun Suit Night'>
        <Input
          type='number'
          id='overpayment-jun-suit-night'
          defaultValue={currentWage?.overpayment_jun_suit_night}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'overpayment_jun_suit_night')
          }
        />
      </FormRow>

      <FormRow label='Overpayment Jun Suit Holiday'>
        <Input
          type='number'
          id='overpayment-jun-suit-holiday'
          defaultValue={currentWage?.overpayment_jun_suit_holiday}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'overpayment_jun_suit_holiday')
          }
        />
      </FormRow>

      <FormRow label='Overpayment Jun Suit Night Holiday'>
        <Input
          type='number'
          id='overpayment-jun-suit-night-holiday'
          defaultValue={currentWage?.overpayment_jun_suit_night_holiday}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'overpayment_jun_suit_night_holiday')
          }
        />
      </FormRow>

      <FormRow label='Overpayment Sen Vest'>
        <Input
          type='number'
          id='overpayment-sen-vest'
          defaultValue={currentWage?.overpayment_sen_vest}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'overpayment_sen_vest')
          }
        />
      </FormRow>

      <FormRow label='Overpayment Sen Vest Night'>
        <Input
          type='number'
          id='overpayment-sen-vest-night'
          defaultValue={currentWage?.overpayment_sen_vest_night}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'overpayment_sen_vest_night')
          }
        />
      </FormRow>

      <FormRow label='Overpayment Sen Vest Holiday'>
        <Input
          type='number'
          id='overpayment-sen-vest-holiday'
          defaultValue={currentWage?.overpayment_sen_vest_holiday}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'overpayment_sen_vest_holiday')
          }
        />
      </FormRow>

      <FormRow label='Overpayment Sen Vest Night Holiday'>
        <Input
          type='number'
          id='overpayment-sen-vest-night-holiday'
          defaultValue={currentWage?.overpayment_sen_vest_night_holiday}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'overpayment_sen_vest_night_holiday')
          }
        />
      </FormRow>

      <FormRow label='Overpayment Sen Suit'>
        <Input
          type='number'
          id='overpayment-sen-suit'
          defaultValue={currentWage?.overpayment_sen_suit}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'overpayment_sen_suit')
          }
        />
      </FormRow>

      <FormRow label='Overpayment Sen Suit Night'>
        <Input
          type='number'
          id='overpayment-sen-suit-night'
          defaultValue={currentWage?.overpayment_sen_suit_night}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'overpayment_sen_suit_night')
          }
        />
      </FormRow>

      <FormRow label='Overpayment Sen Suit Holiday'>
        <Input
          type='number'
          id='overpayment-sen-suit-holiday'
          defaultValue={currentWage?.overpayment_sen_suit_holiday}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'overpayment_sen_suit_holiday')
          }
        />
      </FormRow>

      <FormRow label='Overpayment Sen Suit Night Holiday'>
        <Input
          type='number'
          id='overpayment-sen-suit-night-holiday'
          defaultValue={currentWage?.overpayment_sen_suit_night_holiday}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'overpayment_sen_suit_night_holiday')
          }
        />
      </FormRow>

      <FormRow label='Holiday Compensation (%)'>
        <Input
          type='number'
          id='holiday-compensation-rate'
          defaultValue={currentWage?.holiday_compensation}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'holiday_compensation')
          }
        />
      </FormRow>

      <FormRow label='Night Allowance Rate'>
        <Input
          type='number'
          id='night-allowance-rate'
          defaultValue={currentWage?.night_allowance_rate}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'night_allowance_rate')
          }
        />
      </FormRow>

      <FormRow label='Insignificance Limit'>
        <Input
          type='number'
          id='insignificance-limit'
          defaultValue={currentWage?.insignificance_limit}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'insignificance_limit')
          }
        />
      </FormRow>

      <FormRow label='Beginning Night Hours'>
        <Input
          type='time'
          id='beginning-night-hours'
          defaultValue={currentWage?.beginning_night_hours}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'beginning_night_hours')
          }
        />
      </FormRow>

      <FormRow label='Ending Night Hours'>
        <Input
          type='time'
          id='ending-night-hours'
          defaultValue={currentWage?.ending_night_hours}
          disabled={isUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdateWage(e, 'ending_night_hours')
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
