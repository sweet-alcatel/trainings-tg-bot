import { MyCommandContext } from '../types/conversation';

const fetch = require('node-fetch');

export const getReport = async (ctx: MyCommandContext) => {
  try {
    const response = await fetch(`${process.env.domain}/api/v1/report/`);

    if (!response.ok) {
      throw new Error('Ошибка выполнения запроса');
    }

    const contentDispositionHeader = response.headers.get(
      'content-disposition',
    );

    const regexFileName = /"(.*?)"/g;

    const fileName = contentDispositionHeader.match(regexFileName);

    if (!fileName) {
      throw new Error('Нет совпадений по тексту в кавычках');
    }

    const arrayBuffer = await response.arrayBuffer();
    const arr = new Uint8Array(arrayBuffer);

    return {
      arr,
      fileName,
    };
  } catch {
    await ctx.reply('При получении отчета произошла ошибка');
  }
};
