import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  HiTableCells,
  HiOutlineHome,
  HiOutlineCog6Tooth,
  HiCalendarDays,
} from 'react-icons/hi2';
import { LuEuro } from 'react-icons/lu';
import { useWages } from '../features/settings/useWages';
import { WageType } from '../types/collection';
import { HolidayData } from '../types';

type StyledNavLinkProps = {
  hasdot?: string;
};

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)<StyledNavLinkProps>`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  position: relative;

  &:link,
  &:visited {
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }

  /* styles for the red dot */
  &::after {
    content: '';
    display: ${({ hasdot }) => (hasdot === 'true' ? 'block' : 'none')};
    position: absolute;
    top: 50%;
    right: 6rem;
    transform: translate(0, -50%);
    width: 0.6rem;
    height: 0.6rem;
    background-color: var(--color-holiday-font-red);
    border-radius: 50%;
  }
`;

const MainNav = () => {
  const { wages } = useWages();

  const hasEmptyHolidays = wages?.some((wage: WageType) => {
    const holidaysData = wage.holidays as HolidayData;
    return holidaysData?.dates.length === 0;
  });

  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to='/dashboard'>
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/calendar'>
            <HiCalendarDays />
            <span>Calendar</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/payrolls'>
            <LuEuro />
            <span>Payrolls</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/jobs'>
            <HiTableCells />
            <span>Jobs</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink
            to='/settings'
            hasdot={hasEmptyHolidays ? 'true' : 'false'}
          >
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
};

export default MainNav;
