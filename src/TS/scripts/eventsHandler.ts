import { IUserData } from "./../../typings/user";
import bridge, { VKBridge } from "@vkontakte/vk-bridge";

const eventHandler = (setUserData: (user: IUserData) => void): void => {
	bridge.subscribe((event) => {
		if (!event.detail) {
			return;
		}

		if (event.detail.type === "VKWebAppGetUserInfoResult") {
			setUserData({
				id: event.detail.data.id,
				sign: window.location.href,
				fetchedUser: event.detail.data,
			});
		}

		console.log(event);
	});
};

export default eventHandler;
