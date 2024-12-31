/* eslint-disable @typescript-eslint/no-require-imports */
import { MyCommandContext } from '../types/conversation';

const fetch = require('node-fetch');

export const getMyself = async (ctx: MyCommandContext) => {
  try {
    const response = await fetch(
      `${process.env.domain}/api/v1/user/${ctx.chat.id}`,
    );

    if (!response.ok) {
      throw new Error('Ошибка выполнения запроса');
    }

    const person = await response.json();

    await ctx.reply(`
        telegram ID: ${person.telegramID}
        Имя: ${person.name} 
        Рост: ${person.height}
        Вес: ${person.weight}
        Цели: ${person.goals}
        Травмы: ${person.injuries}
        Комментарий: ${person.comment}`);
  } catch {
    await ctx.reply('При получении данных о себе произошла ошибка');
  }
};
