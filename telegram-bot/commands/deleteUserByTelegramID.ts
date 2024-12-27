/* eslint-disable @typescript-eslint/no-require-imports */
import { type Context } from 'grammy';

import {
  type Conversation,
  type ConversationFlavor,
} from '@grammyjs/conversations';
const fetch = require('node-fetch');

type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

export async function deleteUserByTelegramID(
  conversation: MyConversation,
  ctx: MyContext,
) {
  await ctx.reply(
    'Вы попали в диалог удаления пользователя. Введите его telegram ID',
  );

  const { message } = await conversation.wait();

  try {
    await fetch(`${process.env.domain}/api/v1/user/${message?.text}`, {
      method: 'DELETE',
    });

    await ctx.reply('Удаление произошло успешно!');
  } catch {
    await ctx.reply('При удалении произошла ошибка, попробуйте снова');
  }
}
