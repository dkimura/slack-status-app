const { app, BrowserWindow, TouchBar } = require('electron');
const axios = require('axios');
const emoji = require('node-emoji');

let window;
const token = process.env.SLACK_TOKEN || '';
const { TouchBarPopover, TouchBarButton, TouchBarSlider } = TouchBar;

const updateSlackStatus = (value) => {
  if (!token) return;

  axios
    .get('https://slack.com/api/users.profile.set', {
      params: { token, profile: { status_emoji: value } },
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
};

const touchBarButton = () => {
  const value = emoji.random();

  return new TouchBarButton({
    label: value.emoji,
    click: () => updateSlackStatus(`:${value.key}:`),
  });
};

const touchBar = new TouchBar([
  touchBarButton(),
  touchBarButton(),
  touchBarButton(),
  touchBarButton(),
  touchBarButton(),
]);

app.once('ready', () => {
  window = new BrowserWindow({
    width: 0,
    height: 0,
    transparent: true,
    frame: false,
  });
  window.loadURL('about:blank');
  window.setTouchBar(touchBar);
});
