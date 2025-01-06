import { MyCommandContext, MyContext } from '../types/conversation';
const fetch = require('node-fetch');

export const checkRole = async (ctx: MyContext | MyCommandContext) => {
  try {
    const response = await fetch(
      `${process.env.domain}/api/v1/user/${ctx.chat?.id}`,
    );

    if (!response.ok) {
      throw new Error('Ошибка выполнения запроса');
    }

    const person = await response.json();

    return person.role;
  } catch {
    console.error('Ошибка определения роли');
  }
};
