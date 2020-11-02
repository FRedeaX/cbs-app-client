import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATE } from "./actionTypes"
import axios from "../../axios/axios-quiz";

export function createQuizQuestion(item) {
	return {
		type: CREATE_QUIZ_QUESTION,
		item
	}
}

export function finishCreateQuiz() {
	return async (dispatch, getState) => {
		console.log(getState());

		await axios.post('/quizes.json', getState().create.quiz);
		dispatch(resetQuizCreator())
	}
}

export function resetQuizCreator() {
	return {
		type: RESET_QUIZ_CREATE
	}
}