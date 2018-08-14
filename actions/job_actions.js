//import axios from 'axios';
//import reverseGeocode from 'latlng-to-zip';
//import qs from 'qs';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from './types';
import JOB_DATA from './IndeedJobData.json';

// const JOB_QUERY_PARAMS = {
//   publisher: '888888888888',
//   format: 'json',
//   v: '2',
//   latlong: 1,
//   radius: 10,
//   q: 'javascript'
// };

// const JOB_QUERY_PARAMS = {
//   description: 'javascript'
// };

// const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';

// const buildJobUrl = (zip) => {
//   const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
//   return `${JOB_ROOT_URL}${query}`;
// };

export const fetchJobs = (region, callback) => async (dispatch) => {
  try {
    //let zip = await reverseGeocode(region);
    // const url = buildJobUrl(region);
    // let { data } = await axios.get(url);
    const data = JOB_DATA;
    dispatch({ type: FETCH_JOBS, payload: data });
    callback();
  } catch (e) {
      console.error(e);
  }
}; 

export const likeJob = (job) => {
  return {
    type: LIKE_JOB,
    payload: job
  };
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
};
