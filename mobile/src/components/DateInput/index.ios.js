import React, {useState, useMemo} from 'react';
import {View, DatePickerIOS} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';

import {Container, DateButton, DateEvent, Picker} from './styles';

export default function DateInput({date, onChange}) {
  const [opened, setOpened] = useState(false);
  const formattedDate = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", {locale: pt}),
    [date],
  );

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#fff" size={25} />
        <DateEvent>{formattedDate}</DateEvent>
      </DateButton>

      {opened && (
        <Picker>
          <DatePickerIOS
            date={date}
            onDateChange={onChange}
            minimumDate={new Date()}
            minuteInterval={60}
            locale="pt"
            mode="date"
          />
        </Picker>
      )}
    </Container>
  );
}