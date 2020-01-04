import React from 'react';

import { Container, Badge } from './styles';
import { MdNotifications } from 'react-icons/md';

export default function Notifications() {
  return (
    <Container>
      <Badge hasUnread>
        <MdNotifications color="#7159c1" size={25} />
      </Badge>
    </Container>
  );
}
