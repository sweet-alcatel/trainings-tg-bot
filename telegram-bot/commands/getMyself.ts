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
        \nИмя: ${person.name} 
        \nРост: ${person.height}
        \nВес: ${person.weight}
        \nЦели: ${person.goals}
        \nТравмы: ${person.injuries}
        \nКомментарий: ${person.comment}`);
  } catch {
    await ctx.reply('При получении данных о себе произошла ошибка');
  }
};
