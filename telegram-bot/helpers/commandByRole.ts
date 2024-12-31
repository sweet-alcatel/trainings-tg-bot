import { Role } from '../data/role';
import { checkRole } from './checkRole';
import { MyCommandContext } from '../types/conversation';

const commandByRole = async (
  ctx: MyCommandContext,
  func: () => Promise<void>,
) => {
  const role = await checkRole(ctx.chat?.id as number);

  if (!role || role === Role.USER) {
    await ctx.reply('Недопустимая команда для вас, диалог завершается');
    return;
  }

  await func();
};

export { commandByRole };
