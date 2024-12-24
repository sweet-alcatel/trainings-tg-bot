/* eslint-disable @typescript-eslint/no-require-imports */
import { CommandContext, Context } from 'grammy';

const fetch = require('node-fetch');

export const getPersons = async (ctx: CommandContext<Context>) => {
  const response = await fetch(`${process.env.domain}/api/v1/user/`);

  const data = await response.json();

  for await (const person of data) {
    ctx.reply(`
        Имя: ${person.name} 
        Рост: ${person.height}
        Вес: ${person.weight}
        Цели: ${person.goals}
        Травмы: ${person.injuries}
        Комментарий: ${person.comment}`);
  }
};
