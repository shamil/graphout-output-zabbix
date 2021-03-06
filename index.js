/**
 * zabbix output for graphout
 */
var ZabbixSender = require('node-zabbix-sender');

// constructor
var ZabbixOutput = module.exports = function(events, log, params) {
    // let's first validate required params
    validateParams(params);

    // set sender options
    var sender_opts = {
        host:       params.host,
        port:       params.port,
        items_host: params.target,
        with_timestamps: true
    };

    // create ZabbixSender instance
    var Sender = new ZabbixSender(sender_opts);

    // add item to payload on result
    events.on('result', function(result, options) {
        var item = (params.namespace + options.name).replace(/\.+/g, '.');
        log.debug('adding item', {key: item, value: result});
        Sender.addItem(item, result);
    });

    // send all collected items each second
    setInterval(function() {
        // do nothing if no items to send
        if (Sender.countItems() < 1) {
            return;
        }

        log.debug('sending', Sender.countItems(), 'items');
        Sender.send(function(err, res) {
            if (err) {
                log.error('send failed', {error: err.message});
                return;
            }

            log.debug('response', res);
        });
    }, 1000);
};

function validateParams(params) {
    ['host', 'port', 'target', 'namespace'].forEach(function(param) {
        switch (param) {
            case 'port':
                params[param] = params[param] || 10051;
                break;

            case 'namespace':
                params[param] = params[param] ? params[param] + '.' : 'graphout.';
                break;

            default:
                if (typeof params[param] === 'undefined')
                    throw new Error('param ' + param + ' missing');
        }
    });
}
