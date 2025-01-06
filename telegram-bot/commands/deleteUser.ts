import { Role } from '../data/role';
import { MyContext, MyConversation } from '../types/conversation';
import { conversationByRole } from '../helpers/conversationByRole';
const fetch = require('node-fetch');

const deleteUserCommand = async (
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

export const deleteUser = async (
  conversation: MyConversation,
  ctx: MyContext,
) => {
  await conversationByRole(ctx, async () => {
    await deleteUserCommand(conversation, ctx);
  });
};
