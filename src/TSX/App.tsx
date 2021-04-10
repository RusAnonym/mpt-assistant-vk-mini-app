import React, { useState } from "react";

import {
	ConfigProvider,
	AdaptivityProvider,
	AppRoot,
	SplitLayout,
	SplitCol,
	View,
	Panel,
	usePlatform,
	VKCOM,
	PanelHeader,
	TabbarItem,
	Epic,
	Tabbar,
	PanelHeaderBack,
} from "@vkontakte/vkui";

import { Icon36UserCircleOutline } from "@vkontakte/icons";
import { Icon28NotebookAddBadgeOutline } from "@vkontakte/icons";
import { Icon36HomeOutline } from "@vkontakte/icons";
import { Icon28EducationOutline } from "@vkontakte/icons";
import { Icon36Users3Outline } from "@vkontakte/icons";

import MainPage from "./pages/main/main";
import ProfilePage from "./pages/profile/main";
import ReplacementPage from "./pages/replacements/main";
import SchedulePage from "./pages/schedule/main";
import FriendsPage from "./pages/friends/main";

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
	const onStoryChange: React.MouseEventHandler<HTMLElement> = (e) => {
		return setActiveStory(e.currentTarget.dataset.story || "main");
	};
	const platform = usePlatform();
	const hasHeader = platform !== VKCOM;

	return (
		<ConfigProvider scheme="space_gray">
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout
						header={hasHeader && <PanelHeader separator={false} />}
						style={{ justifyContent: "center" }}
					>
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
											{<page.element />}
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
