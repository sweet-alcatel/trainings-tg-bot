import { Bot, type Context, session } from "grammy";
import dotenv from 'dotenv';
import {
    type ConversationFlavor,
    conversations,
    createConversation,
} from "@grammyjs/conversations";
import { greeting } from './commands/greeting';
import { getPersons } from "./commands/getPersons";

dotenv.config();

type MyContext = Context & ConversationFlavor;

export const bot = new Bot<MyContext>(`${process.env.bot_token}`);

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());

bot.use(createConversation(greeting));

bot.command("start", async (ctx) => await ctx.reply("Привет!"));

bot.command('help', async (ctx) => {
    await ctx.reply('На данный момент бот умеет выполнять команды /greeting и /getPersons')
})

bot.command('greeting', async (ctx) => {
    await ctx.conversation.enter('greeting')
})

bot.command('getPersons', getPersons);

bot.start();


