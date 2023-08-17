import { styled } from 'styled-components';

const StyledHolidayInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;

  p {
    font-size: 1.6rem;
    color: var(--color-grey-600);
    text-align: left;
    line-height: 1.5;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const HolidayInfo = () => {
  return (
    <StyledHolidayInfo>
      <p>
        To add dates to an empty Excel sheet and save it as a .csv file, follow
        these steps:
        <br />
        <br />
        1. Open Microsoft Excel and create a new, empty worksheet.
        <br />
        2. Enter your holiday dates in the format: dd.mm.yyyy
        <br />
        3. Save the Excel sheet by going to "File" &rarr; "Save As" and choose
        the file format as "CSV (Comma delimited) (*.csv)".
        <br />
        4. Choose a suitable file name and save location for your CSV file.
        <br />
        5. Once your CSV file is saved, you can upload it here.
      </p>
      <p>Here's an example of how your Excel sheet should look:</p>
      <img src='csv_holiday_info.png' alt='Example CSV file'></img>
    </StyledHolidayInfo>
  );
};

export default HolidayInfo;
