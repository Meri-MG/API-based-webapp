import { JSDOM } from 'jsdom';
import { countElements } from './comments.js';

const dom = new JSDOM(`<!DOCTYPE html><body><ul id="addList" class="flcol"></body>`);// eslint-disable-line

global.document = dom.window.document;
global.window = dom.window;

const ul = document.getElementById('addList');

test('test count of elements', () => {
  const li = document.createElement('li');
  ul.appendChild(li);
  expect(countElements(ul)).toBe(1);
});
