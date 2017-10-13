module.exports = function (context, req) {
    var keyName = process.env.keyname;
    var keyValue = process.env.keyvalue;
    var deviceId = req.query.deviceid;
    var iothubHost = process.env.iothubhostname+"/devices/"+deviceId;

    // "myhub.azure-devices.net/devices/device1";
    // var sas = serviceSas.create(connStr.HostName, connStr.SharedAccessKeyName, connStr.SharedAccessKey, anHourFromNow()).toString();
    var serviceSdk = require('azure-iothub');
	var serviceSas = require('azure-iothub').SharedAccessSignature;
    var expiresInMins = 60;
    var expires = (Date.now() / 1000) + expiresInMins * 60;
    var sasTokenDevice = serviceSas.create(iothubHost, keyName, keyValue, expires);
    var sasTokenDeviceString = sasTokenDevice.toString();
    context.res = {
      sastoken: sasTokenDeviceString
    };
    context.done();
};