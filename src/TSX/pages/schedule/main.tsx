import {
	Div,
	Group,
	Avatar,
	Title,
	SimpleCell,
	ScreenSpinner,
	List,
	Cell,
	Text,
	RichCell,
} from "@vkontakte/vkui";

import moment from "moment";
import React, { useState, useEffect } from "react";

import wrapper from "../../../TS/scripts/wrapper";
import { Day, Lesson } from "../../../typings/mpt";

import Params from "../../../typings/params";

const Main: React.FC<Params> = (params) => {
	const [selectedDate, setDate] = useState<moment.Moment>(moment());
	const [selectedSchedule, setSchedule] = useState<any>();
	const [isLoad, setLoad] = useState<boolean>(true);

	if (params.user.group === "") {
		return (
			<Div>
				<Title level="1" weight="medium">
					У вас не установлена группа
				</Title>
			</Div>
		);
	}

	useEffect(() => {
		wrapper.schedule.get({ name: params.user.group }).then((res) => {
			setSchedule(res.response[selectedDate.day() - 1]);
			console.log(res.response);
			setLoad(false);
		});
	}, []);

	if (isLoad) {
		return <ScreenSpinner></ScreenSpinner>;
	}

	return (
		<Div className="schedule-page">
			<Title className="title" level="2" weight="medium">
				Расписание на {selectedDate.format("DD.MM.YYYY")}
				<br />({selectedSchedule?.place})
			</Title>
			<Group>
				<List className="schedule">
					{selectedSchedule?.lessons.map((lesson: Lesson) => {
						return (
							<Div>
								<RichCell
									before={
										<Text
											weight="regular"
											style={{
												paddingTop: "20px",
												paddingRight: "10px",
											}}
										>
											{lesson.num}.
										</Text>
									}
									disabled
									multiline
									bottom={<Text weight="semibold">{lesson.teacher}</Text>}
								>
									<Text weight="regular"> {lesson.name}</Text>
								</RichCell>
							</Div>
						);
					})}
				</List>
			</Group>
		</Div>
	);
};

export default Main;
