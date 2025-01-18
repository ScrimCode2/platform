import MTProto from '@mtproto/core';
import path from 'path';

const api_id = 28085167; // Ваш API ID
const api_hash = '93b01d31432190329616ac7e21fb019e'; // Ваш API Hash

const mtproto = new MTProto({
  api_id,
  api_hash,
  storageOptions: {
    path: path.resolve(__dirname, './data/mtproto.json'), // Укажите путь для хранения сессии
  },
});

// Функция авторизации
const login = async () => {
  try {
    const { phone_code_hash } = await mtproto.call('auth.sendCode', {
      phone_number: '79534307434', // Укажите ваш номер телефона
      settings: {
        _: 'codeSettings',
      },
    });

    console.log('Введите код, отправленный на ваш телефон:');
    const phone_code = '12345'; // Введите код из SMS вручную или используйте консоль

    const signInResult = await mtproto.call('auth.signIn', {
      phone_number: '79534307434',
      phone_code_hash,
      phone_code,
    });

    console.log('Успешная авторизация:', signInResult);
  } catch (error) {
    console.error('Ошибка авторизации:', error);
    throw error;
  }
};

if (!mtproto.storage.get('user')) {
  login(); // Выполните авторизацию, если сессия не создана
}

export const callApi = async (method, params = {}) => {
  try {
    console.log(`Calling API method: ${method} with params:`, params);
    const result = await mtproto.call(method, params);
    console.log(`Result for ${method}:`, result);
    return result;
  } catch (error) {
    console.error(`MTProto Error in method ${method}`, error);
    if (error.error_message) {
      console.error(`Telegram Error: ${error.error_message}`);
    }
    throw error;
  }
};

export default mtproto;
