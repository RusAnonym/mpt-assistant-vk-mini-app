import moment from "moment";
import { Div, Group, Avatar, Title, SimpleCell } from "@vkontakte/vkui";
import { Icon36Users3Outline } from "@vkontakte/icons";
import { Icon24ClockOutline } from "@vkontakte/icons";
import React from "react";
import Params from "../../../typings/params";

const Main: React.FC<Params> = (params) => {
	return (
		<Div className="profile-page">
			<Group className="user" mode="plain">
				<Avatar
					size={96}
					src={params.user.fetchedUser.photo_200}
					className="avatar"
				/>
				<Title className="title" level="1" weight="medium">
					{`${params.user.fetchedUser.first_name} ${params.user.fetchedUser.last_name}`}
				</Title>
			</Group>

			<Group mode="plain">
				<SimpleCell
					indicator={params.user.group}
					expandable
					before={<Icon36Users3Outline width={28} />}
					disabled
				>
					Ваша группа
				</SimpleCell>
				<SimpleCell
					indicator={moment(params.user.reg_date).format("DD.MM.YYYY")}
					expandable
					before={<Icon24ClockOutline width={28} />}
					disabled
				>
					Дата регистрации
				</SimpleCell>
			</Group>
		</Div>
	);
};

export default Main;
