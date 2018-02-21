function hex2a(hex) {
	var str = '';
	for (var i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	return str;
}

function addZero(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

function hexToBytes(hex) {
	for (var bytes = [], c = 0; c < hex.length; c += 2)
	bytes.push(parseInt(hex.substr(c, 2), 16));
	return bytes;
}

function e2t(epoch) {
	var date = new Date(parseFloat(epoch + '000'));
	fecha = addZero((date.getMonth() + 1)) + "." +
	addZero(date.getDate()) + "." +
	date.getFullYear() + " " +
	addZero(date.getHours()) + ":" +
	addZero(date.getMinutes()) + ":" +
	addZero(date.getSeconds());
	return fecha;
}

$.get("https://explorer.cha.terahash.cl/api/addr/cbUUuT7wKZRan5PZCU1Qib63e4TWNKXJ2p", function(tx) {
	var info = [];
	$.each(tx['transactions'], function( index, txin ) {
		$.get("https://explorer.cha.terahash.cl/api/tx/" + txin, function(op_return) {
			$.each(op_return['vout'], function ( index , op ) {
				if(op['scriptPubKey']['asm'].indexOf('RETURN') > 0) {

					msg_hex = op['scriptPubKey']['hex'].substring(4);

					for (i = 5; i >= 0; i--) {
						time_hex = msg_hex.substring(0 + (i*24), 8 + (i*24))
						temp_hex = msg_hex.substring(8 + (i*24), 16 + (i*24))
						hum_hex = msg_hex.substring(16 + (i*24), 24 + (i*24))

						var temp = new Float32Array((new Uint8Array(hexToBytes(temp_hex))).buffer)[0];
						var hum = new Float32Array((new Uint8Array(hexToBytes(hum_hex))).buffer)[0];
						var time = new Uint32Array((new Uint8Array(hexToBytes(time_hex))).buffer)[0];

						log = 'Temperatura ' + Number((temp).toFixed(2)) + '°C' + ', Humedad ' + Number((hum).toFixed(2)) + '%' 
						$("#msg").html($('#msg').html() + e2t(time) + ': ' + log + '<br>');
					}

				}
			});
		});
	});
});