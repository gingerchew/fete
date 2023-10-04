// @vitest-environment jsdom
import { expect, test } from 'vitest';
import { fete } from './index';

test('Creates fete object', () => {
    const $ = fete()

    expect($).toHaveProperty('on');
    expect($).toHaveProperty('off');
    expect($).toHaveProperty('emit');
})

test('Adds event listeners and emits events', () => {
    const $ = fete();

    let i = 0;

    $.on('incr', () => i += 1);

    $.emit('incr');
    $.emit('incr');
    $.emit('incr');
    $.emit('incr');

    expect(i).toBe(4);
})

test('Removes event listeners', () => {
    const $ = fete();
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

test('Handles scope / prefixing', () => {
    const $ = fete();
    const _ = fete('scope');
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
    const $ = fete('', document);

    let i = 0;

    $.on('click', () => i += 1);

    $.emit('click');

    document.documentElement.click();

    expect(i).toBe(2);

    const $$ = new EventTarget();
    const _ = fete('', $$);

    _.on('customEvent', () => i -= 1);

    _.emit('customEvent');

    $$.dispatchEvent(new CustomEvent('customEvent'));

    expect(i).toBe(0);
});