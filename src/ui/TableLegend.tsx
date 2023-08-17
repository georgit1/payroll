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
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '16px',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: colorItem.color,
                border: '2px solid var(--color-grey-200)',
                marginRight: '5px',
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
