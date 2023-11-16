# Juhla

> Feast, festival, celebration

Juhla is a wrapper around the native Event Target interface. It clocks in at around 290b (195b gzip, 167b br), and uses familiar methods.

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

Aliased events are also supported.

```js
// $(document);
const $ = juhla('', document);

$.click(incr); // is the same as
$.on('click', incr);

$.customEvent(incr); // custom events are _techinically_ supported
$.emit('customEvent'); // using $.on for these preferred
```

<details>
    <summary>Current Limitations on the aliased functions</summary>
    <p>While all of the events are there, this also means some events that are longer are not given their shorter counterparts</p>
    <p>For example, jQuery's <code>.ready()</code> event handler would become <code>.DOMContentLoaded()</code>.</p>
    <p>This is on the todo list, but would require increasing the size limit to achieve</p>
</details>


## Todo

- [ ] Remove extra 9 bytes from adding the aliased event handlers
- [ ] Add aliased event names, like `ready` for `DOMContentLoaded`
- [ ] Find plugin to remove unnecessary semicolons

## Inspirations

- [Stefan's](https://www.stefanjudis.com/) [How to use EventTarget as a web native event emitter](https://www.stefanjudis.com/today-i-learned/how-to-use-eventtarget-as-a-web-native-event-emitter/).
- [mitt](https://github.com/developit/mitt): A functional 200b event emitter/pubsub.