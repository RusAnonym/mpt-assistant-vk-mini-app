import {
	Icon28EducationOutline,
	Icon28NotebookAddBadgeOutline,
	Icon36HomeOutline,
	Icon36UserCircleOutline,
	Icon36Users3Outline,
} from "@vkontakte/icons";
import {
	AdaptivityProvider,
	AppRoot,
	ConfigProvider,
	Epic,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	ScreenSpinner,
	SplitCol,
	SplitLayout,
	Tabbar,
	TabbarItem,
	usePlatform,
	View,
	VKCOM,
} from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import { IUserData } from "../typings/user";
import FriendsPage from "./pages/friends/main";
import MainPage from "./pages/main/main";
import ProfilePage from "./pages/profile/main";
import ReplacementPage from "./pages/replacements/main";
import SchedulePage from "./pages/schedule/main";

import bridge from "@vkontakte/vk-bridge";

import eventsHandler from "../TS/scripts/eventsHandler";

const Pages = [
	{
		link: "replacements",
		name: "Замены",
		icon: Icon28NotebookAddBadgeOutline,
		element: ReplacementPage,
	},
	{
		link: "schedule",
		name: "Расписание",
		icon: Icon28EducationOutline,
		element: SchedulePage,
	},
	{
		link: "main",
		name: "Главная",
		icon: Icon36HomeOutline,
		element: MainPage,
	},
	{
		link: "friends",
		name: "Друзья",
		icon: Icon36Users3Outline,
		element: FriendsPage,
	},
	{
		link: "profile",
		name: "Профиль",
		icon: Icon36UserCircleOutline,
		element: ProfilePage,
	},
];

const App: React.FC = () => {
	const [activeStory, setActiveStory] = useState<string>("main");
	const [userData, setUserData] = useState<IUserData>();

	const onStoryChange: React.MouseEventHandler<HTMLElement> = (e) => {
		return setActiveStory(e.currentTarget.dataset.story || "main");
	};

	const platform = usePlatform();
	const hasHeader = platform !== VKCOM;

	useEffect(function AppEffectHook() {
		eventsHandler(setUserData);
		bridge.send("VKWebAppGetUserInfo");
	}, []);

	if (!userData) {
		return (
			<ConfigProvider scheme="space_gray" appearance="dark">
				<AdaptivityProvider>
					<AppRoot>
						<ScreenSpinner></ScreenSpinner>
					</AppRoot>
				</AdaptivityProvider>
			</ConfigProvider>
		);
	}

	return (
		<ConfigProvider scheme="space_gray" appearance="dark">
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout header={hasHeader && <PanelHeader separator={false} />}>
						<SplitCol animate>
							<Epic
								activeStory={activeStory}
								tabbar={
									<Tabbar>
										{Pages.map((page) => (
											<TabbarItem
												onClick={onStoryChange}
												selected={activeStory === page.link}
												data-story={page.link}
												text={page.name}
											>
												<page.icon width={28} height={28} />
											</TabbarItem>
										))}
									</Tabbar>
								}
							>
								{Pages.map((page) => (
									<View id={page.link} activePanel={page.link}>
										<Panel id={page.link}>
											<PanelHeader left={<PanelHeaderBack />}>
												{page.name}
											</PanelHeader>
											{<page.element user={userData} />}
										</Panel>
									</View>
								))}
							</Epic>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
};

export default App;
