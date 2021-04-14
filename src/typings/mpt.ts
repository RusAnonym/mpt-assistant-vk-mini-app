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

interface APILesson {
	num: number;
	name: [string, string?];
	teacher: [string, string?];
}

interface APIDay {
	num: number;
	place: string;
	name: string;
	lessons: APILesson[];
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

export type { Lesson, Day, Replacement, APIDay, APILesson };
