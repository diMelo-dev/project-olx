import { AdType } from './AdType'

export type UserInfoType = {
    name: string,
    email: string,
    state: string,
    ads: AdType[]
}