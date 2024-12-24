import { type Context } from "grammy";

import {
    type Conversation,
    type ConversationFlavor,

} from "@grammyjs/conversations";

type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>

export async function greeting(conversation: MyConversation, ctx: MyContext) {
    await ctx.reply("Привет! Как тебя зовут?");

    const { message } = await conversation.wait();

    if(message?.text === 'выйти') {
        return
    }
    
    await ctx.reply(`Добро пожаловать в чат, ${message?.text}!`);
}
