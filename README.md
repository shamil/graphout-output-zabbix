### About

This library is a **Graphout** module. It's not intended to be used alone.

The module adds support for outputing **Graphout** queries to Zabbix server using
[`zabbix_sender`](https://www.npmjs.com/package/node-zabbix-sender) (trapper) protocol.


### Configuration params

to use this module, make sure to configure it in **Graphout** config.
here are the available params:

```json
{
    "output": "graphout-output-zabbix",
    "params":
    {
        "host": "zabbix.example.com",
        "port": 10051,
        "target": "monitor",
        "namespace": "graphout"
    }
}

```

**`output`**

set this to `graphout-output-zabbix`

**`params.host`**

set this to the zabbix server host/ip

**`params.port`**

set this to the zabbix server port, usually (and **default**) is `10051`

**`params.target`**

set this to target monitored host in zabbix server, all items will go under this host.
the host must exist in zabbix server.

**`params.namespace`**

this is just a prefix of the item key. for example, if you have query named `http_latency`,
and `namespace` is `graphout`, the final item's key name will be `graphout.http_latency` and
this is the key must exist in zabbix server under `target` host. **default** is `graphout`
