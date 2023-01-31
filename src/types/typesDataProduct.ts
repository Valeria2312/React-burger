export interface IIngredient {
    readonly _id: string
    readonly name: string
    readonly type: string
    readonly proteins: number
    readonly fat: number
    readonly carbohydrates: number
    readonly calories: number
    readonly price: number
    readonly image: string
    readonly image_mobile: string
    readonly image_large: string
     __v: number
     uuid: string
    index: number
}

export type TOrder = {
    ingredients: Array<string>;
    _id: string;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
};

export type TWSData = {
    success: boolean;
    orders: Array<TOrder>;
    total: 0;
    totalToday: 0;
};