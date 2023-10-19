# Juhla

> Feast, festival, celebration

Juhla is a wrapper around the native Event Target interface. It clocks in at around 230b (142b gzip, 110b br), and uses familiar methods.

```js
import { juhla } from 'juhla'; // notice it is juhla and not fête

const evt = juhla();

const myHandler = ({ detail }) => console.log(detail);

evt.on('my-custom-event', myHandler); 

evt.emit('my-custom-event', { detail: 'hi :)' }); // hi :)

evt.off('my-custom-event', myHandler);
// or use one to run the handler one time
evt.one('my-custom-event', myHandler);
```

If you need to namespace events, pass a string to the first parameter.

```js
const myEvt = juhla('me');
const yourEvt = juhla('you');

myEvt.on('greeting', () => console.log('hi!'));
yourEvt.on('greeting', () => console.log('yoyoyo'));

myEvt.emit('greeting') // hi!
yourEvt.emit('greeting') // yoyoyo
```

## Inspirations

- [Stefan's](https://www.stefanjudis.com/) [How to use EventTarget as a web native event emitter](https://www.stefanjudis.com/today-i-learned/how-to-use-eventtarget-as-a-web-native-event-emitter/).
- [mitt](https://github.com/developit/mitt): A functional 200b event emitter/pubsub.