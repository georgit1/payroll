import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  grid-column: 1/-1;

  display: flex;
  align-items: center;
  padding: 1.8rem;
`;

const ProgressBarWrapper = styled.div`
  flex: 1;
  margin-right: 0.9rem;
`;

const ProgressBarValue = styled.progress`
  width: 100%;
  height: 2.1rem;
`;

const ProgressBarPercentage = styled.span`
  font-weight: bold;
`;

type ProgessBarProps = {
  max: number;
  value: number;
};

const ProgressBar = ({ max, value }: ProgessBarProps) => {
  const percentage = (value / max) * 100;

  return (
    <ProgressBarContainer>
      <ProgressBarWrapper>
        <ProgressBarValue max={max} value={value}></ProgressBarValue>
      </ProgressBarWrapper>
      <ProgressBarPercentage>{`${percentage.toFixed(
        1
      )}%`}</ProgressBarPercentage>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
