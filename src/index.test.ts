// @vitest-environment jsdom
import { expect, test } from 'vitest';
import { juhla } from './index';

test('Creates juhla object', () => {
    const $ = juhla()

    expect($).toHaveProperty('on');
    expect($).toHaveProperty('off');
    expect($).toHaveProperty('emit');
})

test('Adds event listeners and emits events', () => {
    const $ = juhla();

    let i = 0;

    $.on('incr', () => i += 1);

    $.emit('incr');
    $.emit('incr');
    $.emit('incr');
    $.emit('incr');

    expect(i).toBe(4);
})

test('Removes event listeners', () => {
    const $ = juhla();
    let i = 0;
    const incr = () => i += 1;
    $.on('incr', incr);

    $.emit('incr');
    $.emit('incr');
    
    $.off('incr', incr);
    $.emit('incr');
    $.emit('incr');

    expect(i).toBe(2);
});

test('Handles once', () => {
    let i = 0;
    const $ = juhla();

    const incr = () => i += 1;

    $.one('incr', incr);
    $.emit('incr');
    $.emit('incr');
    
    expect(i).toBe(1);
})

test('Handles scope / prefixing', () => {
    const $ = juhla();
    const _ = juhla('scope');
    let $i = 0;
    let _i = 0;
    _.on('incr', () => _i += 1);
    $.on('incr', () => $i += 1);

    _.emit('incr');
    _.emit('incr');
    _.emit('incr');
    _.emit('incr');

    expect(_i).toBe(4);
    expect($i).toBe(0);
});

test('Context can be changed', () => {
    const $ = juhla('', document);

    let i = 0;

    $.on('click', () => i += 1);

    $.emit('click');

    document.documentElement.click();

    expect(i).toBe(2);

    const $$ = new EventTarget();
    const _ = juhla('', $$);

    _.on('customEvent', () => i -= 1);

    _.emit('customEvent');

    $$.dispatchEvent(new CustomEvent('customEvent'));

    expect(i).toBe(0);
});

test('Handles alias event listeners', () => {
    const $ = juhla();
    let i = 0;
    const incr = () => i += 1;

    $.click(incr);

    $.emit('click');

    expect(i).toBe(1);
})

test('Supports multiple events', () => {
    const $ = juhla();

    let i = 0;

    $.on('incr incr2', () => i += 1);

    $.emit('incr');
    $.emit('incr2');

    expect(i).toBe(2);
})