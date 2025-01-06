import { Role } from '../data/role';
import { checkRole } from './checkRole';
import { MyContext } from '../types/conversation';

const conversationByRole = async (ctx: MyContext, func: () => Promise<any>) => {
  const role = await checkRole(ctx);

  if (!role || role === Role.USER) {
    await ctx.reply('Недопустимая команда для вас, диалог завершается');
    return;
  }

  return await func();
};

export { conversationByRole };
