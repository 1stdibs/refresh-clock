# refresh-clock
Refresh clock React component.

<img src='refreshclock.gif?raw=true' height="60px">

##installation:
```sh
npm install --save refresh-clock
```

##usage:
```js
const RefreshClock = require('refresh-clock');

<RefreshClock
    loadTime={moment().format('h:mm a')}
    refresh={() => window.location.reload()}
/>
```
