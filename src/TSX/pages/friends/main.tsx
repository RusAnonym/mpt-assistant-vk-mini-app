import bridge from "@vkontakte/vk-bridge";
import { Button, Spinner } from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";

const Main: React.FC = () => {
	const [friends, updateFriends] = useState<number[]>([]);

	useEffect(() => {
		bridge
			.send("VKWebAppGetAuthToken", {
				app_id: 7816329,
				scope: "friends",
			})
			.then(async (res) => {
				if (res.scope.includes("friends")) {
					const response = (
						await bridge.send("VKWebAppCallAPIMethod", {
							method: "friends.get",
							params: {
								access_token: res.access_token,
								v: "5.103",
							},
						})
					).response;
					updateFriends(response.items);
				}
			});
	});

	return friends.length === 0 ? (
		<Spinner />
	) : (
		<Button
			mode="commerce"
			onClick={() =>
				bridge.send("VKWebAppGetAuthToken", {
					app_id: 7816329,
					scope: "friends",
				})
			}
		>
			{JSON.stringify(friends)}
		</Button>
	);
};

export default Main;
