/* eslint-disable @typescript-eslint/no-require-imports */
import { type Context } from 'grammy';

import {
  type Conversation,
  type ConversationFlavor,
} from '@grammyjs/conversations';
const fetch = require('node-fetch');

type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

export const deleteUser = async (
  conversation: MyConversation,
  ctx: MyContext,
) => {
  await ctx.reply(
    'Вы попали в диалог удаления пользователя. Введите его telegram ID',
  );

  const { message } = await conversation.wait();

  try {
    const response = await fetch(
      `${process.env.domain}/api/v1/user/${message?.text}`,
      {
        method: 'DELETE',
      },
    );

    if (response.status === 404) {
      await ctx.reply('Пользователь не найден, диалог завершается');
      return;
    }

    await ctx.reply('Удаление произошло успешно!');
  } catch {
    await ctx.reply(
      'При удалении пользователя произошла ошибка, попробуйте снова',
    );
  }
};
