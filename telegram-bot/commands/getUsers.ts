/* eslint-disable @typescript-eslint/no-require-imports */
import { CommandContext, Context } from 'grammy';

const fetch = require('node-fetch');

export const getUsers = async (ctx: CommandContext<Context>) => {
  try {
    const response = await fetch(`${process.env.domain}/api/v1/user/`);

    const data = await response.json();

    for await (const person of data) {
      ctx.reply(`
      telegram ID: ${person.telegramID}
      Имя: ${person.name} 
      Рост: ${person.height}
      Вес: ${person.weight}
      Цели: ${person.goals}
      Травмы: ${person.injuries}
      Комментарий: ${person.comment}`);
    }
  } catch {
    await ctx.reply(
      'При получении пользователей произошла ошибка, повторите операцию',
    );
  }
};
