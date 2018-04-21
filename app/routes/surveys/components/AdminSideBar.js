// @flow

import * as React from 'react';
import styles from './surveys.css';
import { Link } from 'react-router';
import { ConfirmModalWithParent } from 'app/components/Modal/ConfirmModal';
import type { ActionGrant } from 'app/models';
import { ContentSidebar } from 'app/components/Content';

type Props = {
  surveyId: number,
  deleteFunction?: number => Promise<*>,
  push?: string => void,
  actionGrant: ActionGrant,
  token?: string
};

const AdminSideBar = ({
  surveyId,
  deleteFunction,
  actionGrant,
  push,
  token
}: Props) => {
  const canEdit = actionGrant.includes('edit');

  const onConfirm = () => {
    if (deleteFunction && push) {
      return (
        deleteFunction &&
        deleteFunction(surveyId).then(() => push && push('/surveys'))
      );
    }
    if (deleteFunction) {
      return deleteFunction && deleteFunction(surveyId);
    }
    return Promise.resolve();
  };

  const shareLink = !token
    ? ''
    : `https://www.abakus.no/surveys/${surveyId}/submissions/summary/?token=${token}`;
  console.log('admin side bar', canEdit, 'token:', token);
  return (
    canEdit && (
      <ContentSidebar className={styles.adminSideBar}>
        <strong>Admin</strong>
        <ul>
          <li>
            <Link to="/surveys/add">Ny undersøkelse</Link>
          </li>
          <li>
            <Link to={`/surveys/${surveyId}/edit`}>Endre undersøkelsen</Link>
          </li>
          {deleteFunction && (
            <ConfirmModalWithParent
              title="Slett undersøkelse"
              message="Er du sikker på at du vil slette denne undersøkelseen?"
              onConfirm={onConfirm}
            >
              <li>
                <Link to="">Slett undersøkelsen</Link>
              </li>
            </ConfirmModalWithParent>
          )}
          {token && <Link to={shareLink}>Delbar link</Link>}
        </ul>
      </ContentSidebar>
    )
  );
};

export default AdminSideBar;
