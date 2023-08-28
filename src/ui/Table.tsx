import { CSSProperties, ReactNode, createContext, useContext } from 'react';
import styled from 'styled-components';

type CommonRowProps = {
  columns: string;
};

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

type TableContextType = {
  columns: string;
};

const defaultTableContextValue: TableContextType = {
  columns: '',
};

type TableProps = {
  columns: string;
  children: ReactNode | ReactNode[];
};

type TableHeaderProps = {
  children: ReactNode | ReactNode[];
};

type TableRowProps = {
  style?: CSSProperties;
  children: ReactNode | ReactNode[];
};

type TableBodyProps<T> = {
  data: T[];
  render: (item: T) => ReactNode;
};

const TableContext = createContext<TableContextType>(defaultTableContextValue);

const Table = ({ columns, children }: TableProps) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role='table'>{children}</StyledTable>
    </TableContext.Provider>
  );
};

const Header = ({ children }: TableHeaderProps) => {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role='row' columns={columns} as='header'>
      {children}
    </StyledHeader>
  );
};

const Row = ({ children, style }: TableRowProps) => {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role='row' columns={columns} style={style}>
      {children}
    </StyledRow>
  );
};

const Body = <T,>({ data, render }: TableBodyProps<T>) => {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
