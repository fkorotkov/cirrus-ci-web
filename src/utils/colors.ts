import { cirrusColors } from '../cirrusTheme';
import { BuildStatus } from '../components/chips/__generated__/BuildStatusChip_build.graphql';
import { TaskStatus } from '../components/chips/__generated__/TaskStatusChip_task.graphql';
import { TaskCommandStatus } from '../components/__generated__/TaskCommandList_task.graphql';
import { NotificationLevel } from '../components/__generated__/Notification_notification.graphql';

export function buildStatusColor(status: BuildStatus) {
  switch (status) {
    case 'CREATED':
      return cirrusColors.initialization;
    case 'EXECUTING':
      return cirrusColors.executing;
    case 'COMPLETED':
      return cirrusColors.success;
    case 'FAILED':
      return cirrusColors.failure;
    case 'ABORTED':
      return cirrusColors.lightFailure;
    default:
      return cirrusColors.warning;
  }
}

export function taskStatusColor(status: TaskStatus) {
  switch (status) {
    case 'CREATED':
      return cirrusColors.lightInitialization;
    case 'SCHEDULED':
      return cirrusColors.initialization;
    case 'EXECUTING':
      return cirrusColors.executing;
    case 'PAUSED':
      return cirrusColors.paused;
    case 'SKIPPED':
      return cirrusColors.lightSuccess;
    case 'COMPLETED':
      return cirrusColors.success;
    case 'ABORTED':
      return cirrusColors.lightFailure;
    case 'FAILED':
      return cirrusColors.failure;
    default:
      return cirrusColors.undefined;
  }
}

export function faviconColor(status: BuildStatus | TaskStatus) {
  switch (status) {
    case 'COMPLETED':
      return cirrusColors.darkSuccess;
    case 'SKIPPED':
      return cirrusColors.darkSuccess;
    case 'ABORTED':
      return cirrusColors.failure;
    case 'FAILED':
      return cirrusColors.failure;
    case 'EXECUTING':
    case 'CREATED':
    case 'SCHEDULED':
    case 'PAUSED':
      return cirrusColors.executing;
    default:
      return cirrusColors.warning;
  }
}

export function commandStatusColor(status: TaskCommandStatus) {
  switch (status) {
    case 'SUCCESS':
      return cirrusColors.lightSuccess;
    case 'EXECUTING':
      return cirrusColors.executing;
    case 'FAILURE':
      return cirrusColors.lightFailure;
    case 'ABORTED':
      return cirrusColors.aborted;
    case 'SKIPPED':
      return cirrusColors.skipped;
    default:
      return cirrusColors.undefined;
  }
}

export function notificationColor(level: NotificationLevel) {
  switch (level) {
    case 'INFO':
      return cirrusColors.success;
    case 'ERROR':
      return cirrusColors.failure;
    default:
      return cirrusColors.warning;
  }
}
