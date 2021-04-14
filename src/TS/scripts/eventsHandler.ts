import { IUserData } from "./../../typings/user";
import bridge, { VKBridge } from "@vkontakte/vk-bridge";

import wrapper from "./wrapper";

const eventHandler = (setUserData: (user: IUserData) => void): void => {
	bridge.subscribe(async (event) => {
		if (!event.detail) {
			return;
		}

		if (event.detail.type === "VKWebAppGetUserInfoResult") {
			let userGroup = "Не определено";
			let userRegDate = new Date();

			try {
				const userData = (
					await wrapper.miniapp.getUserData({
						id: event.detail.data.id,
						sign: window.location.search,
					})
				).response[0];
				userGroup = userData.group;
				userRegDate = new Date(userData.reg_date);
			} catch (error) {}

			setUserData({
				id: event.detail.data.id,
				group: userGroup,
				reg_date: userRegDate,
				sign: window.location.search,
				fetchedUser: event.detail.data,
			});
		}

		console.log(event);
	});
};

export default eventHandler;
