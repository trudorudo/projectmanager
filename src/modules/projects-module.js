// CONSTANTS

import { act } from "react-dom/test-utils";

export const moduleName = 'project-module';

export const FETCH_PROJECTS_REQUEST = `${moduleName}/FETCH_PROJECTS_REQUEST`;

// REDUCERS

const initialState = {
    projectsData: []
};

export default function projectReducer(state = initialState, action = {}) {
    const newState = { ...state };

    switch (action.type) {
        case FETCH_PROJECTS:
            return {
                newState,
                projectsData: action.payload
            }
        default:
            return state;
    }
}

// ACTION CREATORS

 export const getProjects = () => ({
     type: FETCH_PROJECTS_REQUEST
 });

 // SAGAS

//  function* getProjectsSaga(action){
//      try {
//          const projects = yield ....
//      } catch (e) {
//     yield
// }
//  }