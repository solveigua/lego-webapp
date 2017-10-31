// @flow

import React from 'react';
import styles from './AnnouncementsList.css';
import Flex from 'app/components/Layout/Flex';
import { Form, SelectInput, TextArea } from 'app/components/Form';
import { reduxForm, Field, reset } from 'redux-form';
import Button from 'app/components/Button';

type Props = {
  createAnnouncement: (...any) => void,
  actionGrant: Array<string>,
  handleSubmit: Function => void,
  invalid: boolean,
  pristine: boolean,
  submitting: boolean
};

const AnnouncementsCreate = ({
  createAnnouncement,
  actionGrant,
  handleSubmit,
  invalid,
  pristine,
  submitting
}: Props) => {
  const disabledButton = invalid || pristine || submitting;

  const onSubmit = (announcement, send = false) => {
    return createAnnouncement({
      ...announcement,
      users: announcement.users
        ? announcement.users.map(user => user.value)
        : [],
      groups: announcement.groups
        ? announcement.groups.map(group => group.value)
        : [],
      meetings: announcement.meetings
        ? announcement.meetings.map(meeting => meeting.value)
        : [],
      events: announcement.events
        ? announcement.events.map(event => event.value)
        : [],
      send
    });
  };
  return (
    <div>
      {actionGrant.includes('create') && (
        <Flex column>
          <h2 className={styles.header}>Ny kunngjøring</h2>
          <Form className={styles.form}>
            <Field
              className={styles.msgField}
              name="message"
              component={TextArea.Field}
              placeholder="Skriv din melding her..."
              label="Kunngjøring:"
            />
            <span className={styles.formHeaders}>Mottakere:</span>
            <Flex className={styles.rowRec}>
              <Field
                className={styles.recField}
                name="users"
                placeholder="Brukere"
                filter={['users.user']}
                multi
                component={SelectInput.AutocompleteField}
              />
              <Field
                name="groups"
                placeholder="Grupper"
                filter={['users.abakusgroup']}
                multi
                component={SelectInput.AutocompleteField}
              />
            </Flex>
            <Flex className={styles.rowRec}>
              <Field
                className={styles.recField}
                name="events"
                placeholder="Arrangementer"
                filter={['events.event']}
                multi
                component={SelectInput.AutocompleteField}
              />
              <Field
                name="meetings"
                placeholder="Møter"
                filter={['meetings.meeting']}
                multi
                component={SelectInput.AutocompleteField}
              />
            </Flex>
            <Flex>
              <Button
                onClick={handleSubmit(values => onSubmit(values, false))}
                disabled={disabledButton}
              >
                Opprett
              </Button>
              <Button
                onClick={handleSubmit(values => onSubmit(values, true))}
                disabled={disabledButton}
              >
                Opprett og send
              </Button>
            </Flex>
          </Form>
        </Flex>
      )}
    </div>
  );
};

const resetForm = (result, dispatch) => {
  dispatch(reset('announcementsCreate'));
};

const validateForm = values => {
  const errors = {};
  if (!values.message) {
    errors.message = 'Du må skrive en melding';
  }
  if (!values.groups && !values.meetings && !values.events && !values.users) {
    errors.users = 'Du må velge minst én mottaker';
  }
  return errors;
};

export default reduxForm({
  form: 'announcementsCreate',
  onSubmitSuccess: resetForm,
  validate: validateForm
})(AnnouncementsCreate);
