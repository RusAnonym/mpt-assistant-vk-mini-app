import { RequestIdProp, UserInfo } from "@vkontakte/vk-bridge";

export interface IUserData {
	id: number;
	sign: string;
	fetchedUser: UserInfo & RequestIdProp;
}
