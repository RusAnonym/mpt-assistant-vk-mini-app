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
	Button,
	RichCell,
} from "@vkontakte/vkui";

import moment from "moment";
import React, { useState, useEffect } from "react";

import wrapper from "../../../TS/scripts/wrapper";
import { Day, Lesson } from "../../../typings/mpt";

import Params from "../../../typings/params";

const Main: React.FC<Params> = (params) => {
	const [selectedDate] = useState<moment.Moment>(moment());
	const [selectedSchedule, setSchedule] = useState<Day>();
	const [isLoad, setLoad] = useState<boolean>(true);
	const [isError, setErrorStatus] = useState<boolean>(false);

	if (params.user.group === "") {
		return (
			<Div>
				<Title level="1" weight="medium">
					У вас не установлена группа
				</Title>
			</Div>
		);
	}

	const updateSchedule = async () => {
		setLoad(true);
		try {
			const data = await wrapper.schedule.getByDate({
				group: params.user.group,
				date: selectedDate.format("DD.MM.YYYY"),
			});
			setSchedule(data.response);
		} catch (error) {
			setErrorStatus(true);
		}
		setLoad(false);
	};

	useEffect(() => {
		updateSchedule();
	}, []);

	if (isLoad) {
		return <ScreenSpinner></ScreenSpinner>;
	}

	if (isError) {
		return <Div>Произошла ошибка, обратитесь пожалуйста к разработчику</Div>;
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
						);
					})}
				</List>

				<Div className="buttons">
					<Div className="group">
						<Button mode="secondary" size="l">
							ПН
						</Button>
						<Button mode="secondary" size="l">
							ВТ
						</Button>
						<Button mode="secondary" size="l">
							СР
						</Button>
					</Div>
					<Div className="group">
						<Button mode="secondary" size="l">
							ЧТ
						</Button>
						<Button mode="secondary" size="l">
							ПТ
						</Button>
						<Button mode="secondary" size="l">
							СБ
						</Button>
					</Div>
					<Div className="group">
						<Button
							mode="destructive"
							size="l"
							className="button"
							onClick={() => {
								selectedDate.subtract(1, "day");
								updateSchedule();
							}}
						>
							{moment(selectedDate).subtract(1, "day").format("DD.MM.YYYY")}
						</Button>
						<Button
							mode="commerce"
							size="l"
							className="button"
							onClick={() => {
								selectedDate.add(1, "day");
								updateSchedule();
							}}
						>
							{moment(selectedDate).add(1, "day").format("DD.MM.YYYY")}
						</Button>
					</Div>
				</Div>
			</Group>
		</Div>
	);
};

export default Main;
