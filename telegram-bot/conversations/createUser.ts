import { MyContext, MyConversation } from '../types/conversation';
import { conversationByRole } from '../helpers/conversationByRole';

const fetch = require('node-fetch');

type Body = {
  telegramID: string;
  name: string;
  username: string;
  height: string;
  weight: string;
  goals: string;
  injuries: string;
  comment: string;
};

const createUserCommand = async (
  conversation: MyConversation,
  ctx: MyContext,
) => {
  await ctx.reply(
    'Вы вошли в диалог создания пользователя. Не пропускайте поля',
  );

  const body: Partial<Body> = {
    telegramID: '',
    name: '',
    username: '',
    height: '',
    weight: '',
    goals: '',
    injuries: '',
    comment: '',
  };

  await ctx.reply('Введите telegram ID. Помните о том, что он уникален');

  const telegramIDMessage = await conversation.wait();

  body.telegramID = telegramIDMessage.message?.text;

  await ctx.reply('Введите имя');

  const nameMessage = await conversation.wait();

  body.name = nameMessage.message?.text;

  await ctx.reply('Введите username. Тоже должен быть уникален');

  const userNameMessage = await conversation.wait();

  body.username = userNameMessage.message?.text;

  await ctx.reply('Введите рост');

  const heightMessage = await conversation.wait();

  body.height = heightMessage.message?.text;

  await ctx.reply('Введите вес');

  const weightMessage = await conversation.wait();

  body.weight = weightMessage.message?.text;

  await ctx.reply('Введите цели');

  const goalsMessage = await conversation.wait();

  body.goals = goalsMessage.message?.text;

  await ctx.reply('Укажите травмы');

  const injuriesMessage = await conversation.wait();

  body.injuries = injuriesMessage.message?.text;

  await ctx.reply('Укажите дополнительный комментарий');

  const commentMessage = await conversation.wait();

  body.comment = commentMessage.message?.text;

  try {
    const response = await fetch(`${process.env.domain}/api/v1/user/`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка выполнения запроса');
    }

    await ctx.reply('Данные успешно загружены в базу, спасибо!');
  } catch {
    await ctx.reply('Произошла ошибка создания пользователя');
  }
};

export const createUser = async (
  conversation: MyConversation,
  ctx: MyContext,
) => {
  await conversationByRole(ctx, async () => {
    await createUserCommand(conversation, ctx);
  });
};
