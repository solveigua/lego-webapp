// @flow

import callAPI from 'app/actions/callAPI';
import { Announcements } from './ActionTypes';
import { announcementsSchema } from 'app/reducers';
import { startSubmit, stopSubmit } from 'redux-form';
import { push } from 'react-router-redux';

export function fetchAll() {
  return callAPI({
    types: Announcements.FETCH,
    endpoint: '/announcements/',
    schema: [announcementsSchema],
    meta: {
      errorMessage: 'Fetching announcements failed'
    },
    propagateError: true
  });
}

export function createAnnouncement({
  message,
  users,
  groups,
  events,
  meetings
}) {
  return dispatch => {
    dispatch(startSubmit('AnnouncementsCreate'));

    dispatch(
      callAPI({
        types: Announcements.CREATE,
        endpoint: '/announcements/',
        method: 'POST',
        body: {
          message,
          users,
          groups,
          events,
          meetings
        },
        schema: announcementsSchema,
        meta: {
          errorMessage: 'Creating announcement failed'
        }
      })
    )
      .then(result => {
        const id = result.payload.result;
        dispatch(stopSubmit('AnnouncementsCreate'));
        dispatch(push(`/announcements/${id}`));
      })
      .catch(action => {
        const errors = { ...action.error.response.jsonData };
        dispatch(stopSubmit('AnnouncementsCreate', errors));
      });
  };
}
