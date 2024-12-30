/* eslint-disable @typescript-eslint/no-require-imports */
import { type Context } from 'grammy';

import {
  type Conversation,
  type ConversationFlavor,
} from '@grammyjs/conversations';
import { checkRole } from '../helpers/checkRole';
import { Role } from '../data/role';
const fetch = require('node-fetch');

type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

export const deleteUser = async (
  conversation: MyConversation,
  ctx: MyContext,
) => {
  const role = await checkRole(ctx.chat?.id as number);

  if (!role || role === Role.USER) {
    await ctx.reply('Недопустимая команда для вас, диалог завершается');
    return;
  }

  await ctx.reply(
    'Вы попали в диалог удаления пользователя. Введите его telegram ID',
  );

  const { message } = await conversation.wait();

  try {
    const response = await fetch(
      `${process.env.domain}/api/v1/user/${message?.text}`,
      {
        method: 'DELETE',
        headers: {
          Role: Role.ADMIN,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Ошибка выполнения запроса');
    }

    await ctx.reply('Удаление произошло успешно!');
  } catch {
    await ctx.reply('При удалении пользователя произошла ошибка');
  }
};
