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
import "moment/locale/ru";

import React, { useState, useEffect } from "react";

import wrapper from "../../../TS/scripts/wrapper";
import { Day, Lesson } from "../../../typings/mpt";

import Keyboard from "../../utils/keyboard";

import Params from "../../../typings/params";

moment.locale("ru");

const Main: React.FC<Params> = (params) => {
	const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
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
			setErrorStatus(false);
		} catch (error) {
			console.log(error);
			setErrorStatus(true);
		}
		setLoad(false);
	};

	useEffect(() => {
		updateSchedule();
	}, []);

	useEffect(() => {
		updateSchedule();
	}, [selectedDate]);

	if (isLoad) {
		return <ScreenSpinner></ScreenSpinner>;
	}

	if (selectedDate.day() === 0) {
		return (
			<Div className="schedule-page">
				<Title className="title" level="2" weight="medium">
					Расписание на {selectedDate.format("DD.MM.YYYY")}
					<br />
					Выбранный день воскресенье
				</Title>
				<Keyboard
					currentDate={selectedDate}
					setDate={(date) => {
						setSelectedDate(date);
						setLoad(true);
					}}
				/>
			</Div>
		);
	}

	if (isError) {
		return <Div>Произошла ошибка, обратитесь пожалуйста к разработчику</Div>;
	}

	return (
		<Div className="schedule-page">
			<Title className="title" level="2" weight="medium">
				Расписание на {selectedDate.format("DD.MM.YYYY")}
				<br />({selectedSchedule?.place})
				<br />
				{selectedDate.locale("ru").format("dddd")}
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
				<Keyboard
					currentDate={selectedDate}
					setDate={(date) => {
						setSelectedDate(date);
						updateSchedule();
					}}
				/>
			</Group>
		</Div>
	);
};

export default Main;
