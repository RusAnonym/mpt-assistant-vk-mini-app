import { RequestIdProp, UserInfo } from "@vkontakte/vk-bridge";

export interface IUserData {
	id: number;
	group: string;
	reg_date: Date;
	sign: string;
	fetchedUser: UserInfo & RequestIdProp;
}
