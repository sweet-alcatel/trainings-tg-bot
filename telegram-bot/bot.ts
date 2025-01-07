import { Bot, GrammyError, HttpError, InputFile, session } from 'grammy';
import dotenv from 'dotenv';
import { conversations, createConversation } from '@grammyjs/conversations';
import { getMyself } from './commands/getMyself';
import { getUsers } from './commands/getUsers';
import { createUser } from './conversations/createUser';
import { deleteUser } from './conversations/deleteUser';
import { updateUser } from './conversations/updateUser';
import { MyContext } from './types/conversation';
import { createTraining } from './conversations/createTraining';
import { getReport } from './commands/getReport';
import { commandByRole } from './helpers/commandByRole';
import { CommandGroup } from '@grammyjs/commands';

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

bot.use(createConversation(createUser, 'createuser'));
bot.use(createConversation(updateUser, 'updateuser'));
bot.use(createConversation(deleteUser, 'deleteuser'));
bot.use(createConversation(createTraining, 'createtraining'));

const myCommands = new CommandGroup();

myCommands.command(
  'start',
  'Запуск бота',
  async (ctx) => await ctx.reply('Привет! Введите /help для просмотра команд'),
);

myCommands.command('help', 'Помощь по командам', async (ctx) => {
  await ctx.reply(`
    Команды для администратора: 
    \nПолучение пользователей - /getusers, 
    \nСоздание пользователя - /createuser
    \nРедактирование пользователя - /updateuser 
    \nУдаление пользователя - /deleteuser 
    \nСоздание записи о тренировке - /createtraining
    \nПолучение отчета - /getreport
    \nКоманда для пользователя: 
    \nПолучение информации о себе - /getmyself
    \nЕсли вы застряли во время диалога, прожмите команду /cancel для отмены`);
});

myCommands.command('getmyself', 'Получить информацию о себе', async (ctx) => {
  await getMyself(ctx);
});

myCommands.command('getusers', 'Получить пользователей', getUsers);

bot.command('createuser', async (ctx) => {
  await ctx.conversation.enter('createuser');
});

bot.command('updateuser', async (ctx) => {
  await ctx.conversation.enter('updateuser');
});

bot.command('deleteuser', async (ctx) => {
  await ctx.conversation.enter('deleteuser');
});

bot.command('createtraining', async (ctx) => {
  await ctx.conversation.enter('createtraining');
});

myCommands.command('getreport', 'Получить отчет', async (ctx) => {
  const data = await commandByRole(ctx, async () => {
    return await getReport(ctx);
  });

  if (data) {
    await ctx.replyWithDocument(
      new InputFile(data.arr as Uint8Array<ArrayBufferLike>, data.fileName),
    );
  }
});

bot.use(myCommands);

myCommands.setCommands(bot);

bot.catch((err) => {
  const ctx = err.ctx;

  console.error(`Ошибка при обработке обновления ${ctx.update.update_id}:`);

  const e = err.error;

  if (e instanceof GrammyError) {
    console.error('Ошибка в запросе:', e.description);
  } else if (e instanceof HttpError) {
    console.error('Не удалось связаться с Telegram:', e);
  } else {
    console.error('Неизвестная ошибка:', e);
  }
});

bot.start();
