import { Bot, type Context, session } from 'grammy';
import dotenv from 'dotenv';
import {
  type ConversationFlavor,
  conversations,
  createConversation,
} from '@grammyjs/conversations';
import { getMyself } from './commands/getMyself';
import { getUsers } from './commands/getUsers';
import { createUser } from './commands/createUser';
import { deleteUser } from './commands/deleteUser';
import { updateUser } from './commands/updateUser';

dotenv.config();

type MyContext = Context & ConversationFlavor;

export const bot = new Bot<MyContext>(`${process.env.bot_token}`);

bot.use(session({ initial: () => ({}) }));

bot.use(conversations());

bot.command('cancel', async (ctx) => {
  await ctx.conversation.exit();
  await ctx.reply('Выход...');
});

bot.use(createConversation(createUser));
bot.use(createConversation(updateUser));
bot.use(createConversation(deleteUser));

bot.command('start', async (ctx) => await ctx.reply('Привет!'));

bot.command('help', async (ctx) => {
  await ctx.reply(`
    Команды для администратора: команды /getUsers, /createUser, /updateUser, /deleteUser,
    Команды для пользователя: /getMyself
    Если вы застряли во время диалога, прожмите команду "/cancel" для отмены`);
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

bot.start();
