import bridge from "@vkontakte/vk-bridge";

bridge.subscribe((event) => {
	if (!event.detail) {
		return;
	}

	console.log(event);
});
