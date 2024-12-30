/* eslint-disable @typescript-eslint/no-require-imports */

const fetch = require('node-fetch');

export const checkRole = async (telegramID: number) => {
  try {
    const response = await fetch(
      `${process.env.domain}/api/v1/user/${telegramID}`,
    );

    if (!response.ok) {
      throw new Error('Ошибка выполнения запроса');
    }

    const person = await response.json();

    return person.role;
  } catch (err) {
    console.log(err);
  }
};
