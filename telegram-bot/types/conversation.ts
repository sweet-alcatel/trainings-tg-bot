import { Conversation, ConversationFlavor } from '@grammyjs/conversations';
import { CommandContext, Context } from 'grammy';

export type MyContext = Context & ConversationFlavor;
export type MyCommandContext = CommandContext<Context>;
export type MyConversation = Conversation<MyContext>;
