import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;

  ${({ hasUnread }) =>
    hasUnread &&
    css`
      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #ff892e;
      }
    `}
`;

export const NotificationList = styled.div`
  position: absolute;
  width: 300px;
  left: calc(50% - 150px);
  top: calc(100% + 30px);
  background: rgba(0, 0, 0, 0.8);
  z-index: 100;
  border-radius: 4px;
  padding: 15px 6px;
  display: ${({ visible }) => (visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 15px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 20px solid rgba(0, 0, 0, 0.6);
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 260px;
  padding: 5px 15px;
`;

export const Notification = styled.div`
  color: #fff;

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
  }

  p {
    font-size: 13px;
    line-height: 18px;
  }

  time {
    opacity: 0.6;
    font-size: 12px;
    display: block;
  }

  button {
    font-size: 12px;
    font-weight: bold;
    color: ${lighten(0.2, `#7159c1`)};
    border: 0;
    background: none;
    width: 100%;
    margin-top: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${({ unread }) =>
      unread &&
      css`
        &::after {
          content: '';
          display: inline-block;
          width: 12px;
          height: 12px;
          background: #ff892e;
          border-radius: 50%;
          align-self: flex-end;
        }
      `}
  }
`;
