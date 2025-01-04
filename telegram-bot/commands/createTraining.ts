import { Role } from '../data/role';
import { MyContext, MyConversation } from '../types/conversation';
import { conversationByRole } from '../helpers/conversationByRole';

const fetch = require('node-fetch');

type Body = {
  userId: string;
  date: string;
  comment: string;
};

const createTrainingCommand = async (
  conversation: MyConversation,
  ctx: MyContext,
) => {
  await ctx.reply(
    'Вы вошли в диалог создания тренировки пользователя. Не пропускайте поля',
  );

  const body: Partial<Body> = {
    userId: '',
    date: '',
    comment: '',
  };

  await ctx.reply('Введите telegram ID. Помните о том, что он уникален');

  const telegramIDMessage = await conversation.wait();

  body.userId = telegramIDMessage.message?.text;

  await ctx.reply('Введите дату в формате дд.мм.гггг');

  const dateMessage = await conversation.wait();

  body.date = dateMessage.message?.text;

  await ctx.reply('Введите комментарий');

  const commentMessage = await conversation.wait();

  body.comment = commentMessage.message?.text;

  try {
    const response = await fetch(`${process.env.domain}/api/v1/training/`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Role: Role.ADMIN,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка выполнения запроса');
    }

    await ctx.reply('Данные успешно загружены в базу, спасибо!');
  } catch {
    await ctx.reply('Произошла ошибка добавления тренировки пользователя');
  }
};

export const createTraining = async (
  conversation: MyConversation,
  ctx: MyContext,
) => {
  await conversationByRole(ctx, async () => {
    await createTrainingCommand(conversation, ctx);
  });
};
