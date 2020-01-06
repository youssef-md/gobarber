import React from 'react';
import api from '../../services/api';

import { Container, Time } from './styles';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function Dashboard() {
  return (
    <Container>
      <header>
        <button type="button">
          <MdChevronLeft size={36} color="#FFF" />
        </button>
        <strong>06 de Janeiro</strong>
        <button type="button">
          <MdChevronRight size={36} color="#FFF" />
        </button>
      </header>

      <ul>
        <Time past>
          <strong>08:00</strong>
          <span>Diego Fernandes</span>
        </Time>

        <Time>
          <strong>09:00</strong>
          <span>Diego Fernandes</span>
        </Time>

        <Time>
          <strong>10:00</strong>
          <span>Diego Fernandes</span>
        </Time>

        <Time available>
          <strong>11:00</strong>
          <span>Em aberto</span>
        </Time>
      </ul>
    </Container>
  );
}
