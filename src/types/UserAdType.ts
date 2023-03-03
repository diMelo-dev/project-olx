import { OtherAdType } from "./OtherAdType"

export type UserAdType = {
    category: string
    dateCreated: string,
    description: string,
    id: string,
    images: {
        url: string,
        default: boolean
    }[],
    price: number,
    priceNegotiable: boolean,
    status: boolean,
    title: string,
    views: number
}