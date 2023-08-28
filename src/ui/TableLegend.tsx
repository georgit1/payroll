// unfortunately styled components don't work
const colorCircleStyle = {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  border: '2px solid var(--color-grey-200)',
  marginRight: '5px',
};

const legendItemStyle = {
  display: 'flex',
  alignItems: 'center',
  marginRight: '16px',
};

type ColorItem = {
  color: string;
  label: string;
};

type TableLegendProps = {
  colors: ColorItem[];
};

const TableLegend = ({ colors }: TableLegendProps) => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        {colors.map((colorItem, index) => (
          <div style={legendItemStyle} key={index}>
            <div
              style={{
                ...colorCircleStyle,
                backgroundColor: colorItem.color,
              }}
            />
            <span>{colorItem.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableLegend;
