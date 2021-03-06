# Influxdb-Collector

Collect statistical data to influxdb

## Installation

```bash
$ git clone https://github.com/vicanso/influxdb-collector.git
```

## Examples

add single point use post method

```bash
curl -H "Content-Type:application/json" -H "Referer:https://github.com/vicanso/influxdb-collector" -X POST -d '{"m": "http", "t":{"type": "0"},"f":{"status":200}}' http://127.0.0.1:3000/add-points/vicanso/albi
```

add multi points use post method

```bash
curl -H "Content-Type:application/json" -H "X-Influx-Token:Tree.Xie" -X POST -d '[{"m": "http", "t":{"type": "0"},"f":{"status":200}},{"m": "ajax", "t":{"type": "1"},"f":{"status":500}}]' http://127.0.0.1:3000/add-points/vicanso/timtam
```

add single point use get method
 
```bash
curl "http://127.0.0.1:3000/add-points/vicanso/albi?point=m(http),f(use|30,code|200),t(type|2,spdy|fast)"
```

add multi points use get method

```bash
curl "http://127.0.0.1:3000/add-points/vicanso/albi?point=m(http),t(type|0,spdy|fast),f(use|30,code|500)&point=m(ajax),t(type|1,spdy|slow),f(use|50,code|400)"
```

add point with time filed, if time is 5 minute ago, it will be discarded
```bash
curl -H "Content-Type:application/json" -H "Referer:https://github.com/vicanso/influxdb-collector" -X POST -d '{"m": "http", "t":{"type": "0"},"f":{"status":200},"time":"1422568543702900257"}' http://127.0.0.1:3000/add-points/vicanso/albi
```

## License

MIT