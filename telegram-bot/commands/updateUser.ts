/* eslint-disable @typescript-eslint/no-require-imports */
import { Role } from '../data/role';
import { MyContext, MyConversation } from '../types/conversation';
import { conversationByRole } from '../helpers/conversationByRole';
const fetch = require('node-fetch');

const updateUserCommand = async (
  conversation: MyConversation,
  ctx: MyContext,
) => {
  const body: Partial<Record<string, string>> = {};

  await ctx.reply(
    'Вы попали в диалог обновления пользователя. Введите его telegram ID',
  );

  const telegramIDMessage = await conversation.wait();

  try {
    const findedResponse = await fetch(
      `${process.env.domain}/api/v1/user/${telegramIDMessage?.message?.text}`,
    );

    if (!findedResponse.ok) {
      throw new Error('Ошибка выполнения запроса');
    }

    const user = await findedResponse.json();

    await ctx.reply(`
        Пользователь был найден. Вот его данные
        telegram ID: ${user.telegramID}
        Имя: ${user.name} 
        Рост: ${user.height}
        Вес: ${user.weight}
        Цели: ${user.goals}
        Травмы: ${user.injuries}
        Комментарий: ${user.comment}`);

    await ctx.reply(
      `Выберите поле, которое хотите отредактировать. Вам нужно выбрать соответствующее поле на английском языке и написать его. 
      Например, вы хотите отредактировать вес. По таблице ниже оно называется weight, значит его вы должны написать следующим сообщением.
      Точность и корректность важны. Например, Weight не пройдет валидацию`,
    );

    await ctx.reply(`
        Соответствие смотрите по данной таблице
        telegramID: telegram ID,
        name: Имя,
        username: никнейм (например, OwlNearYou),
        height: Рост,
        weight: Вес,
        goals: Цели,
        injuries: Травмы,
        comment: Комментарий
        `);

    const editableFieldMessage = await conversation.wait();

    await ctx.reply('Хорошо, теперь введите новое значение выбранного поля');

    const valueEditableFieldMessage = await conversation.wait();

    body[editableFieldMessage.message?.text as string] =
      valueEditableFieldMessage.message?.text;

    const updatedReponse = await fetch(
      `${process.env.domain}/api/v1/user/${telegramIDMessage.message?.text}`,
      {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Role: Role.ADMIN,
        },
      },
    );

    if (!updatedReponse.ok) {
      throw new Error('Ошибка выполнения запроса');
    }

    await ctx.reply('Обновление пользователя произошло успешно!');
  } catch {
    await ctx.reply('При обновлении пользователя произошла ошибка');
  }
};

export const updateUser = async (
  conversation: MyConversation,
  ctx: MyContext,
) => {
  await conversationByRole(ctx, async () => {
    await updateUserCommand(conversation, ctx);
  });
};
