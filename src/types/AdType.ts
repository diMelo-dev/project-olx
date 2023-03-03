import { OtherAdType } from "./OtherAdType"

export type AdType = {
    category: {
        name: string,
        slug: string,
        _id: string
    },
    dateCreated: string,
    description: string,
    id: string,
    images: string[],
    others: OtherAdType[],
    price: number,
    priceNegotiable: boolean,
    stateName: string,
    title: string,
    userInfo: {
        email: string,
        name: string
    },
    views: number
}