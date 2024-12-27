import { Bot, type Context, session } from 'grammy';
import dotenv from 'dotenv';
import {
  type ConversationFlavor,
  conversations,
  createConversation,
} from '@grammyjs/conversations';
import { greeting } from './commands/greeting';
import { getUsers } from './commands/getUsers';
import { createUser } from './commands/createUser';
import { deleteUserByTelegramID } from './commands/deleteUserByTelegramID';

dotenv.config();

type MyContext = Context & ConversationFlavor;

export const bot = new Bot<MyContext>(`${process.env.bot_token}`);

bot.use(session({ initial: () => ({}) }));

bot.use(conversations());

bot.command('cancel', async (ctx) => {
  await ctx.conversation.exit();
  await ctx.reply('Выход...');
});

bot.use(createConversation(greeting));
bot.use(createConversation(createUser));
bot.use(createConversation(deleteUserByTelegramID));

bot.command('start', async (ctx) => await ctx.reply('Привет!'));

bot.command('help', async (ctx) => {
  await ctx.reply(`
    На данный момент бот умеет выполнять команды /greeting, /getUsers, /createUser, /deleteUserByTelegramID
    Если вы застряли во время диалога, прожмите команду "/cancel" для отмены`);
});

bot.command('greeting', async (ctx) => {
  await ctx.conversation.enter('greeting');
});

bot.command('createUser', async (ctx) => {
  await ctx.conversation.enter('createUser');
});

bot.command('deleteUserByTelegramID', async (ctx) => {
  await ctx.conversation.enter('deleteUserByTelegramID');
});

bot.command('getUsers', getUsers);

bot.start();
