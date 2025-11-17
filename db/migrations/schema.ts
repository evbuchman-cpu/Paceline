import { pgTable, foreignKey, text, timestamp, integer, jsonb, unique, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const questionnaire = pgTable("questionnaire", {
	id: text().primaryKey().notNull(),
	purchaseId: text().notNull(),
	raceName: text().notNull(),
	raceWebsite: text(),
	raceDate: timestamp({ mode: 'string' }).notNull(),
	goalFinishTime: text().notNull(),
	ultrasCompleted: text().notNull(),
	recentFlatPace: text(),
	climbingStrength: text(),
	weeklyTrainingVolume: integer(),
	crewSupport: text(),
	firstName: text(),
	email: text(),
	stravaAthleteId: text(),
	stravaData: jsonb(),
	recentRaceResults: text(),
	biggestClimbTrained: text(),
	giIssuesHistory: text(),
	blisterProneAreas: text(),
	nutritionPreferences: jsonb(),
	biggestRaceFears: text(),
	completedAt: timestamp({ mode: 'string' }),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.purchaseId],
			foreignColumns: [purchase.id],
			name: "questionnaire_purchaseId_purchase_id_fk"
		}).onDelete("cascade"),
]);

export const verification = pgTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp({ mode: 'string' }).notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
});

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: boolean().default(false).notNull(),
	image: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const account = pgTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text().notNull(),
	providerId: text().notNull(),
	userId: text().notNull(),
	accessToken: text(),
	refreshToken: text(),
	idToken: text(),
	accessTokenExpiresAt: timestamp({ mode: 'string' }),
	refreshTokenExpiresAt: timestamp({ mode: 'string' }),
	scope: text(),
	password: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const session = pgTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: timestamp({ mode: 'string' }).notNull(),
	token: text().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	ipAddress: text(),
	userAgent: text(),
	userId: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_userId_user_id_fk"
		}).onDelete("cascade"),
	unique("session_token_unique").on(table.token),
]);

export const subscription = pgTable("subscription", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp({ mode: 'string' }).notNull(),
	modifiedAt: timestamp({ mode: 'string' }),
	amount: integer().notNull(),
	currency: text().notNull(),
	recurringInterval: text().notNull(),
	status: text().notNull(),
	currentPeriodStart: timestamp({ mode: 'string' }).notNull(),
	currentPeriodEnd: timestamp({ mode: 'string' }).notNull(),
	cancelAtPeriodEnd: boolean().default(false).notNull(),
	canceledAt: timestamp({ mode: 'string' }),
	startedAt: timestamp({ mode: 'string' }).notNull(),
	endsAt: timestamp({ mode: 'string' }),
	endedAt: timestamp({ mode: 'string' }),
	customerId: text().notNull(),
	productId: text().notNull(),
	discountId: text(),
	checkoutId: text().notNull(),
	customerCancellationReason: text(),
	customerCancellationComment: text(),
	metadata: text(),
	customFieldData: text(),
	userId: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "subscription_userId_user_id_fk"
		}),
]);

export const race = pgTable("race", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	distance: integer(),
	elevationGain: integer(),
	location: text(),
	website: text(),
	courseProfile: jsonb(),
	weatherPatterns: jsonb(),
	aidStations: jsonb(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("race_name_unique").on(table.name),
]);

export const purchase = pgTable("purchase", {
	id: text().primaryKey().notNull(),
	userId: text().notNull(),
	tier: text().notNull(),
	amount: integer().notNull(),
	polarSubscriptionId: text(),
	polarOrderId: text(),
	status: text().default('pending').notNull(),
	guidesRemaining: integer().default(1),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "purchase_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const guide = pgTable("guide", {
	id: text().primaryKey().notNull(),
	purchaseId: text().notNull(),
	questionnaireId: text().notNull(),
	pdfUrl: text().notNull(),
	sections: jsonb().notNull(),
	generationTime: integer(),
	aiCost: integer(),
	status: text().default('generating').notNull(),
	error: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.purchaseId],
			foreignColumns: [purchase.id],
			name: "guide_purchaseId_purchase_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.questionnaireId],
			foreignColumns: [questionnaire.id],
			name: "guide_questionnaireId_questionnaire_id_fk"
		}).onDelete("cascade"),
]);
