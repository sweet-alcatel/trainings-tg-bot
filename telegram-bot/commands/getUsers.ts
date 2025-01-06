import { Role } from '../data/role';
import { commandByRole } from '../helpers/commandByRole';
import { MyCommandContext } from '../types/conversation';

const fetch = require('node-fetch');

const getUsersCommand = async (ctx: MyCommandContext) => {
  try {
    const response = await fetch(`${process.env.domain}/api/v1/user/`, {
      headers: {
        Role: Role.ADMIN,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка выполнения запроса');
    }

    const data = await response.json();

    for (const person of data) {
      await ctx.reply(`
      telegram ID: ${person.telegramID}
      \nИмя: ${person.name} 
      \nРост: ${person.height}
      \nВес: ${person.weight}
      \nЦели: ${person.goals}
      \nТравмы: ${person.injuries}
      \nКомментарий: ${person.comment}`);
    }
  } catch {
    await ctx.reply('При получении пользователей произошла ошибка');
  }
};

export const getUsers = async (ctx: MyCommandContext) => {
  await commandByRole(ctx, async () => {
    await getUsersCommand(ctx);
  });
};
