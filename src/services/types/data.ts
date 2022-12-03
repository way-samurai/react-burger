import { ReactNode } from "react";

export type TUser = {
	email: string;
	name: string;
	createdAt?: string;
	updatedAt?: string;
}

export type TIngredient = {
	calories: number;
	carbohydrates: number;
	fat: number;
	image: string;
	image_large: string;
	image_mobile: string;
	name: string;
	price: number;
	proteins: number;
	type: "bun" | "main" | "sauce";
	__v: number;
	_id: string;
	count?: number;
}

// export type TConstructorIngredient = TIngredient & {
// 	id: string;
// }

export type TFeed = {
	createdAt: string;
	ingredients: Array<string>;
	name: string;
	number: number;
	status: string;
	updatedAt: string;
	_id: string;
}

export type TOrder = {
	createdAt: string;
	ingredients: Array<TIngredient>;
	name: string;
	number: number;
	owner: TUser;
	price: number;
	status: string;
	updatedAt: string;
	_id: string;
}

// export type TOrderDetailsResponse = {
// 	name: string
// 	order: TOrder;
// 	success: boolean;
// }