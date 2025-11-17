import { relations } from "drizzle-orm/relations";
import { purchase, questionnaire, user, account, session, subscription, guide } from "./schema";

export const questionnaireRelations = relations(questionnaire, ({one, many}) => ({
	purchase: one(purchase, {
		fields: [questionnaire.purchaseId],
		references: [purchase.id]
	}),
	guides: many(guide),
}));

export const purchaseRelations = relations(purchase, ({one, many}) => ({
	questionnaires: many(questionnaire),
	user: one(user, {
		fields: [purchase.userId],
		references: [user.id]
	}),
	guides: many(guide),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
	subscriptions: many(subscription),
	purchases: many(purchase),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const subscriptionRelations = relations(subscription, ({one}) => ({
	user: one(user, {
		fields: [subscription.userId],
		references: [user.id]
	}),
}));

export const guideRelations = relations(guide, ({one}) => ({
	purchase: one(purchase, {
		fields: [guide.purchaseId],
		references: [purchase.id]
	}),
	questionnaire: one(questionnaire, {
		fields: [guide.questionnaireId],
		references: [questionnaire.id]
	}),
}));