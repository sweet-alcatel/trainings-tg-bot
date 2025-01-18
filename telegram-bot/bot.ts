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

dotenv.config();

const isDev = process.env.NODE_ENV === 'development';

const token = isDev ? process.env.dev_bot_token : process.env.bot_token;

export const bot = new Bot<MyContext>(token!);

bot.use(session({ initial: () => ({}) }));

bot.use(conversations());

bot.api.setMyCommands([
  { command: 'start', description: 'Запустить бота' },
  { command: 'help', description: 'Помощь по командам' },
  { command: 'getmyself', description: 'Получить информацию о себе' },
  {
    command: 'getusers',
    description: 'Получить информацию о всех пользователях',
  },
  { command: 'createuser', description: 'Создать пользователя' },
  { command: 'updateuser', description: 'Обновить информацию по пользователю' },
  {
    command: 'deleteuser',
    description:
      'Удалить пользователя. Внимание! Происходит удаление всех данных, связанных с пользователем',
  },
  { command: 'createtraining', description: 'Создание записи о тренировке' },
  { command: 'getreport', description: 'Получить отчет' },
  { command: 'cancel', description: 'Отмена выполнения команды' },
]);

bot.command('cancel', async (ctx) => {
  await ctx.conversation.exit();
  await ctx.reply('Выход...');
});

bot.use(createConversation(createUser, 'createuser'));
bot.use(createConversation(updateUser, 'updateuser'));
bot.use(createConversation(deleteUser, 'deleteuser'));
bot.use(createConversation(createTraining, 'createtraining'));

bot.command(
  'start',
  async (ctx) => await ctx.reply('Привет! Введите /help для просмотра команд'),
);

bot.command('help', async (ctx) => {
  await ctx.reply(`
    Команды для администратора: 
    \nПолучение пользователей - /getusers
    \nСоздание пользователя - /createuser
    \nРедактирование пользователя - /updateuser 
    \nУдаление пользователя - /deleteuser 
    \nСоздание записи о тренировке - /createtraining
    \nПолучение отчета - /getreport
    \nКоманда для пользователя: 
    \nПолучение информации о себе - /getmyself
    \nЕсли вы застряли во время диалога, прожмите команду /cancel для отмены`);
});

bot.command('getmyself', async (ctx) => {
  await getMyself(ctx);
});

bot.command('getusers', getUsers);

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

bot.command('getreport', async (ctx) => {
  const data = await commandByRole(ctx, async () => {
    return await getReport(ctx);
  });

  if (data) {
    await ctx.replyWithDocument(
      new InputFile(data.arr as Uint8Array<ArrayBufferLike>, data.fileName),
    );
  }
});

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
