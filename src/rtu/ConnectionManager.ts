import ReconnectingWebSocket from '../vendor/reconnecting-websocket/reconnecting-websocket';
import { HandlersManager } from './HandlersManager';

const ws = new ReconnectingWebSocket('wss://api.cirrus-ci.com/ws');

const handlersManager = new HandlersManager();

ws.onopen = function open() {
  let allTopicSubscribeRequests = handlersManager.allRequests();
  allTopicSubscribeRequests.forEach(function(request) {
    try {
      ws.send(request);
    } catch (e) {
      console.log('Failed to resubscribe!', request);
    }
  });
  if (process.env.NODE_ENV === 'development') {
    console.log('Subscribing to ' + allTopicSubscribeRequests.length + ' topics!');
  }
  // send reconnent events so handlers can refresh
  handlersManager.allTopics().forEach(function(topic) {
    handlersManager.handleNewUpdate(topic, { type: 'reconnect' });
  });
};

ws.onerror = function error(err) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Socket error', err);
  }
};

ws.onclose = function close() {
  if (process.env.NODE_ENV === 'development') {
    console.log('disconnected', Date.now());
  }
};

ws.onmessage = function incoming(event) {
  let message = JSON.parse(event.data);
  let data = message.data || {};
  let topic = message.topic || '';
  if (process.env.NODE_ENV === 'development') {
    console.log('Incoming update', message);
  }
  handlersManager.handleNewUpdate(topic, data);
};

export function subscribeObjectUpdates(kind, id, handler) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Subscribing to', kind, id);
  }
  let request = {
    type: 'subscribe',
    kind: kind,
    id: id,
  };
  let requestStr = JSON.stringify(request);
  try {
    ws.send(requestStr);
  } catch (e) {
    console.log('Failed to subscribe!', request, e);
  }
  let topic = (kind + '-update-' + id).toLowerCase().replace(/_/g, '-');
  let topicHandlerDispose = handlersManager.addTopicHandler(topic, requestStr, handler);
  return () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Unsubscribing from', kind, id);
    }
    topicHandlerDispose();
    request.type = 'unsubscribe';
    try {
      ws.send(JSON.stringify(request));
    } catch (e) {
      console.log('Failed to unsubscribe!', request, e);
    }
  };
}

export function subscribeTaskCommandLogs(taskId, command, handler) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Subscribing to logs', taskId, command);
  }
  let request = JSON.stringify({
    type: 'logs',
    taskId: taskId,
    command: command,
  });
  try {
    ws.send(request);
  } catch (e) {
    console.log('Failed to subscribe to logs!', taskId, command, e);
  }
  let topic = 'task-log-' + taskId + '-' + command;
  return handlersManager.addTopicHandler(topic, request, handler);
}
