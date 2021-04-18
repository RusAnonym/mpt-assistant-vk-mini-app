import moment from "moment";
import { Div, Button } from "@vkontakte/vkui";

interface Params {
	setDate(date: moment.Moment): void;
	currentDate: moment.Moment;
}

const Keyboard: React.FC<Params> = ({ setDate, currentDate }) => {
	const getNextDay = (dayNum: number): moment.Moment => {
		const currentDate = new Date();
		const targetDate = new Date();
		const delta = dayNum - currentDate.getDay();
		if (delta >= 0) {
			targetDate.setDate(currentDate.getDate() + delta);
		} else {
			targetDate.setDate(currentDate.getDate() + 7 + delta);
		}
		console.log(moment(targetDate).format("DD.MM.YYYY"));
		return moment(targetDate);
	};

	return (
		<Div className="buttons">
			<Div className="group">
				<Button
					mode="secondary"
					size="l"
					onClick={() => {
						setDate(getNextDay(1));
					}}
				>
					ПН
				</Button>
				<Button
					mode="secondary"
					size="l"
					onClick={() => {
						setDate(getNextDay(2));
					}}
				>
					ВТ
				</Button>
				<Button
					mode="secondary"
					size="l"
					onClick={() => {
						setDate(getNextDay(3));
					}}
				>
					СР
				</Button>
			</Div>
			<Div className="group">
				<Button
					mode="secondary"
					size="l"
					onClick={() => {
						setDate(getNextDay(4));
					}}
				>
					ЧТ
				</Button>
				<Button
					mode="secondary"
					size="l"
					onClick={() => {
						setDate(getNextDay(5));
					}}
				>
					ПТ
				</Button>
				<Button
					mode="secondary"
					size="l"
					onClick={() => {
						setDate(getNextDay(6));
					}}
				>
					СБ
				</Button>
			</Div>
			<Div className="group">
				<Button
					mode="destructive"
					size="l"
					className="button"
					onClick={() => {
						setDate(moment(currentDate).subtract(1, "day"));
					}}
				>
					{moment(currentDate).subtract(1, "day").format("DD.MM.YYYY")}
				</Button>
				<Button
					mode="commerce"
					size="l"
					className="button"
					onClick={() => {
						setDate(moment(currentDate).add(1, "day"));
					}}
				>
					{moment(currentDate).add(1, "day").format("DD.MM.YYYY")}
				</Button>
			</Div>
		</Div>
	);
};

export default Keyboard;
