import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import { Container } from './styles';
import api from '../../services/api';

export default function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar');

  const [fileId, setFileId] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  async function handleAvatar(event) {
    const data = new FormData();
    data.append('file', event.target.files[0]);

    const response = await api.post('files', data);
    const { id, url } = response.data;

    setFileId(id);
    setPreview(url);
  }

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref]);

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview || 'https://api.adorable.io/avatars/126/abott@adorable.png'
          }
          alt=""
        />

        <input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={handleAvatar}
          data-file={fileId}
          ref={ref}
        />
      </label>
    </Container>
  );
}
