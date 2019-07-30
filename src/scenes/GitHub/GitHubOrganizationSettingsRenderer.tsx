import React from 'react';

import { QueryRenderer } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';

import environment from '../../createRelayEnvironment';
import CirrusLinearProgress from '../../components/CirrusLinearProgress';
import { Typography } from '@material-ui/core';
import GitHubOrganizationSettings from '../../components/settings/GitHubOrganizationSettings';
import { RouteComponentProps } from 'react-router';
import { GitHubOrganizationSettingsRendererQuery } from './__generated__/GitHubOrganizationSettingsRendererQuery.graphql';

interface Props extends RouteComponentProps<{ organization: 'organization' }> {}

const GitHubOrganizationSettingsRenderer = props => {
  let organization = props.match.params.organization;
  return (
    <QueryRenderer<GitHubOrganizationSettingsRendererQuery>
      environment={environment}
      variables={props.match.params}
      query={graphql`
        query GitHubOrganizationSettingsRendererQuery($organization: String!) {
          githubOrganizationInfo(organization: $organization) {
            ...GitHubOrganizationSettings_info
          }
        }
      `}
      render={({ error, props }) => {
        if (!props) {
          return <CirrusLinearProgress />;
        }
        return <GitHubOrganizationSettings organization={organization} info={props.githubOrganizationInfo} />;
      }}
    />
  );
};

export default GitHubOrganizationSettingsRenderer;