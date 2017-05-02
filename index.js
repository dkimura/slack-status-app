const { app, BrowserWindow, TouchBar } = require('electron');
const axios = require('axios');
const emoji = require('node-emoji');

let window;
const token = process.env.SLACK_TOKEN || '';
const { TouchBarButton } = TouchBar;

const updateSlackStatus = (value) => {
  if (!token) throw Error('please set slack token');

  axios
    .get('https://slack.com/api/users.profile.set', {
      params: { token, profile: { status_emoji: value } },
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
};

const setTouchBar = touchBar => window.setTouchBar(touchBar);

const createTouchBarButton = () => {
  const value = emoji.random();
  return new TouchBarButton({
    label: value.emoji,
    click: () => updateSlackStatus(`:${value.key}:`),
  });
};

const createTouchBarButtons = () => [
  createTouchBarButton(),
  createTouchBarButton(),
  createTouchBarButton(),
  createTouchBarButton(),
  createTouchBarButton(),
  createTouchBarButton(),
  createTouchBarButton(),
];

const createTouchBar = touchBarButtons => new TouchBar(touchBarButtons);

const createReloadBarButton = () => new TouchBarButton({
  label: 'Reload',
  click: () => setTouchBar(createTouchBar([
    ...createTouchBarButtons(),
    createReloadBarButton(),
  ])),
});

app.once('ready', () => {
  window = new BrowserWindow({
    width: 0,
    height: 0,
    transparent: true,
    frame: false,
  });
  window.loadURL('about:blank');

  setTouchBar(createTouchBar([
    ...createTouchBarButtons(),
    createReloadBarButton(),
  ]));
});
