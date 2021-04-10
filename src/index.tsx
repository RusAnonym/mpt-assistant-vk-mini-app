import React from "react";
import ReactDOM from "react-dom";
import App from "./TSX/App";
import bridge from "@vkontakte/vk-bridge";

import "./SCSS/main.scss";

import "./TS/scripts/eventsHandler";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root"),
	() => bridge.send("VKWebAppInit"),
);
