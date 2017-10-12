module.exports = function (context, req) {
    var iothub = require('azure-iothub');
    var connectionString = process.env.iothubconnectionstring;
    var iothubHost = process.env.iothubhostname;
    var deviceId = req.query.deviceid;

    var registry = iothub.Registry.fromConnectionString(connectionString);
    registry.get(deviceId, (err, getDevDesc) => {
        var deviceKey = getDevDesc.authentication.symmetricKey.primaryKey;
        // HostName=iothubname.azure-devices.net;DeviceId=deviceid;SharedAccessKey=SasKey
        var sasToken = "HostName=iothubHost;DeviceId=deviceId;SharedAccessKey=deviceKey";
        var sasToken = sasToken.replace("deviceId", deviceId);
        var sasToken = sasToken.replace("deviceKey", deviceKey);
        var sasToken = sasToken.replace("iothubHost", iothubHost);
        context.res = {
            sastoken: sasToken
        };
        context.done();
    });
};