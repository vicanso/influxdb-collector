'use strict';
const assert = require('assert');
const influx = require('../client/influx');

describe('influx-client', () => {
	it('write point success', done => {
		class Image {
			constructor() {

			}
			set src(v) {
				assert.equal(v.indexOf('/add-points/albi?point=measurement(http),fields(use|30,code|200),tags(type|2,spdy|fast),time('), 0);
				setTimeout(this.onload, 100);
			}
		}

		global.Image = Image;

		influx.write('http', {
			use: 30,
			code: 200
		}, {
			type: '2',
			spdy: 'fast'
		}).end(done);
	});

	it('write points with no tags success', done => {
		class Image {
			constructor() {

			}
			set src(v) {
				assert.equal(v.indexOf('/add-points/albi?point=measurement(http),fields(use|30,code|200),time('), 0);
				setTimeout(this.onload, 100);
			}
		}

		global.Image = Image;

		influx.write('http', {
			use: 30,
			code: 200
		}).end(done);
	});

	it('queue point success', done => {
		influx.write('http', {
			use: 30,
			code: 200
		}, {
			type: '2',
			spdy: 'fast'
		}).queue();

		influx.write('http', {
			use: 300,
			code: 500
		}, {
			type: '5',
			spdy: 'slow'
		}).queue();

		assert.equal(influx.getQueueLength(), 2);

		assert.equal(influx.getQueueData().length, 2);
		done();
	});

	it('sync queue points success', done => {
		class Image {
			constructor() {

			}
			set src(v) {
				const arr = v.split('&');
				assert.equal(arr[0].indexOf('/add-points/albi?point=measurement(http),fields(use|30,code|200),tags(type|2,spdy|fast),time('), 0);
				assert.equal(arr[1].indexOf('point=measurement(http),fields(use|300,code|500),tags(type|5,spdy|slow),time('), 0);
				setTimeout(this.onload, 100);
			}
		}

		global.Image = Image;

		influx.sync(done);
	});
});