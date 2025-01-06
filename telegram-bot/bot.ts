import { Bot, GrammyError, HttpError, InputFile, session } from 'grammy';
import dotenv from 'dotenv';
import { conversations, createConversation } from '@grammyjs/conversations';
import { getMyself } from './commands/getMyself';
import { getUsers } from './commands/getUsers';
import { createUser } from './commands/createUser';
import { deleteUser } from './commands/deleteUser';
import { updateUser } from './commands/updateUser';
import { MyContext } from './types/conversation';
import { createTraining } from './commands/createTraining';
import { getReport } from './commands/getReport';
import { commandByRole } from './helpers/commandByRole';

dotenv.config();

const isDev = process.env.NODE_ENV === 'development';

const token = isDev ? process.env.dev_bot_token : process.env.bot_token;

export const bot = new Bot<MyContext>(token!);

bot.use(session({ initial: () => ({}) }));

bot.use(conversations());

bot.command('cancel', async (ctx) => {
  await ctx.conversation.exit();
  await ctx.reply('Выход...');
});

bot.use(createConversation(createUser));
bot.use(createConversation(updateUser));
bot.use(createConversation(deleteUser));
bot.use(createConversation(createTraining));

bot.command(
  'start',
  async (ctx) => await ctx.reply('Привет! Введите /help для просмотра команд'),
);

bot.command('help', async (ctx) => {
  await ctx.reply(`
    Команды для администратора: команды /getUsers, /createUser, /updateUser, /deleteUser, /createTraining, /getReport
    Команда для пользователя: /getMyself
    Если вы застряли во время диалога, прожмите команду /cancel для отмены`);
});

bot.command('getMyself', async (ctx) => {
  await getMyself(ctx);
});

bot.command('getUsers', getUsers);

bot.command('createUser', async (ctx) => {
  await ctx.conversation.enter('createUser');
});

bot.command('updateUser', async (ctx) => {
  await ctx.conversation.enter('updateUser');
});

bot.command('deleteUser', async (ctx) => {
  await ctx.conversation.enter('deleteUser');
});

bot.command('createTraining', async (ctx) => {
  await ctx.conversation.enter('createTraining');
});

bot.command('getReport', async (ctx) => {
  const data = await commandByRole(ctx, async () => {
    return await getReport(ctx);
  });

  await ctx.replyWithDocument(
    new InputFile(data.arr as Uint8Array<ArrayBufferLike>, data.fileName),
  );
});

bot.catch((err) => {
  const ctx = err.ctx;

  console.error(`Error while handling update ${ctx.update.update_id}:`);

  const e = err.error;

  if (e instanceof GrammyError) {
    console.error('Error in request:', e.description);
  } else if (e instanceof HttpError) {
    console.error('Could not contact Telegram:', e);
  } else {
    console.error('Unknown error:', e);
  }
});

bot.start();
