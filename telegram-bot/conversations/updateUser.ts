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
        \nИмя: ${user.name} 
        \nРост: ${user.height}
        \nВес: ${user.weight}
        \nЦели: ${user.goals}
        \nТравмы: ${user.injuries}
        \nКомментарий: ${user.comment}`);

    await ctx.reply(
      `Выберите поле, которое хотите отредактировать. Вам нужно выбрать соответствующее поле на английском языке и написать его.
      \nНапример, вы хотите отредактировать вес. По таблице ниже оно называется weight, значит его вы должны написать следующим сообщением.
      \nТочность и корректность важны. Например, Weight не пройдет валидацию`,
    );

    await ctx.reply(`
        Соответствие смотрите по данной таблице
        \nname: Имя
        \nusername: никнейм (например, OwlNearYou)
        \nheight: Рост
        \nweight: Вес
        \ngoals: Цели
        \ninjuries: Травмы
        \ncomment: Комментарий
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
