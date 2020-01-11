import {Alert} from 'react-native';
import {all, takeLatest, call, put} from 'redux-saga/effects';

import api from '../../../services/api';
import {updateProfileSuccess, updateProfileFailure} from './actions';

export function* updateProfile({payload}) {
  try {
    const {name, email, ...rest} = payload.data;
    const profile = Object.assign({name, email}, rest.oldPassword ? rest : {});

    const response = yield call(api.put, 'users', profile);
    yield put(updateProfileSuccess(response.data));

    Alert.alert('Tudo certo!', 'Perfil atualizado com sucesso');
  } catch (error) {
    Alert.alert(
      'Falha na atualização',
      'Houve um erro na atualização do perfil, verifique seus dados',
    );
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
