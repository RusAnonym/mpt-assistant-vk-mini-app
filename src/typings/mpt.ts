interface Lesson {
	num: number;
	name: string;
	teacher: string;
}

interface Day {
	num: number;
	place: string;
	name: string;
	lessons: Lesson[];
}

interface Replacement {
	date: Date;
	group: string;
	detected: Date;
	addToSite: Date;
	lessonNum: number;
	oldLessonName: string;
	oldLessonTeacher: string;
	newLessonName: string;
	newLessonTeacher: string;
	hash: string;
}

type Week = "Числитель" | "Знаменатель" | "Не определено";

export type { Lesson, Day, Replacement, Week };
