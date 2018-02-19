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

$.get("//explorer.cha.terahash.cl/api/addr/cZJXM2yPqjbinTZ48fV8tjGqjxAePJeWuQ", function(tx) {
	var info = [];
	$.each(tx['transactions'], function( index, txin ) {
		$.get("//explorer.cha.terahash.cl/api/tx/" + txin, function(op_return) {
			$.each(op_return['vout'], function ( index , op ) {
				if(op['scriptPubKey']['asm'].indexOf('RETURN') > 0) {

					msg_hex = op['scriptPubKey']['hex'].substring(4);
					msg = hex2a(op['scriptPubKey']['hex'].substring(4));
					timestamp = op_return['time'];
					
					output = '<a href="//explorer.cha.terahash.cl/tx/' + txin + '" target="_blank">' + e2t(timestamp) +
					'</a>: ' + msg_hex + ' (' + msg + ')<br>';

					$("#msg").html($('#msg').html() + output);
				}
			});
		});
	});
});