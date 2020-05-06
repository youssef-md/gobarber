import styled from 'styled-components';
import { shade, lighten } from 'polished';

export const Container = styled.button`
  width: 100%;
  padding: 16px;
  margin-top: 20px;
  background: #ff9000;
  text-transform: uppercase;
  font-weight: bold;
  border: 0;
  border-radius: 5px;
  border: 2px solid #ff9000;

  transition: all 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }

  &:focus {
    border: 2px solid ${lighten(0.5, '#ff9000')};
  }
`;
