import { Div } from "@vkontakte/vkui";

import React from "react";

import moment from "moment";

const Main: React.FC = () => {
	return <Div className="main-page">
		ого сегодня {moment().format("DD.MM.YYYY")}
	</Div>;
};

export default Main;
