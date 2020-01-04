import React, { useState, useEffect } from 'react';
import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll,
} from './styles';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '../../services/api';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');

      const formattedNotifications = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        ),
      }));

      setNotifications(formattedNotifications);
    }

    loadNotifications();
  }, []);

  return (
    <Container>
      <Badge onClick={() => setVisible(!visible)} hasUnread>
        <MdNotifications color="#7159c1" size={25} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              <button type="button">Marcar como lida</button>
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
