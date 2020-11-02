import { RESET_QUIZ_CREATE, CREATE_QUIZ_QUESTION } from "../action/actionTypes"

const initialState = {
	quiz: []
}

export default function createReducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_QUIZ_QUESTION:
			return {
				...state,
				quiz: [...state.quiz, action.item]
			}
		case RESET_QUIZ_CREATE:
			return {
				...state, quiz: []
			}
		default:
			return state
	}
}