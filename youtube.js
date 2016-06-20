// TODO
//// - Guardar enviats
//// - vore qui s'ha desuscrit
//// 

var mensaje = 'Gracias por seguirnos NOMBRE!\nEspero que los tutoriales te ayuden a sacar todavía mejor música\nY para cualquier cosa ya sabes\n\nun abrazo';
var cuando_no_hay_nombre = 'bro';
var paginas = 0;
var cuantos_mensajes = 5; // 0 para sin limite
var debug = false;
var timeout_entre_mensajes = 10000;
for(i=0;i<paginas;i++){
	 setTimeout(function() {
			document.querySelector('.load-more-text').click();
        }, 2000*i);
}

function enviar_mensajes(){	
	var enviar = true;	
	var all_users = (document.querySelectorAll('.send-button-info'));
	var n = 0;
	for(var i in all_users){
		if( cuantos_mensajes && n>cuantos_mensajes) break;
		var user = all_users[i];
		if(!user) continue;
		var channel_id = user.getAttribute('data-channel-id');
		if(!channel_id) continue;
		var nombre_usuario = user.getAttribute('data-title');
		if(nombre_usuario.indexOf(" ")!=-1){	
			nombre_usuario_corto = nombre_usuario.substr(0,nombre_usuario.indexOf(" "));
			if(nombre_usuario_corto.length>2) nombre_usuario = nombre_usuario_corto;
		}
		if(localStorage.getItem(channel_id)){
			//already sent
			console.log('already sent to '+channel_id);
			continue;	
		}
		 setTimeout((function(user,channel_id,nombre_usuario) {
		 	return function(){
				user.children[0].click();
				console.log('sending t to '+channel_id);
				mensaje_enviar = mensaje;
				if(mensaje_enviar.indexOf('NOMBRE')!=-1){
					if(nombre_usuario) mensaje_enviar = mensaje_enviar.replace(/NOMBRE/g, nombre_usuario);
					else mensaje_enviar = mensaje_enviar.replace(/NOMBRE/g, cuando_no_hay_nombre);
				}						
				document.querySelectorAll('textarea[name=content]')[0].value = mensaje_enviar
				//enviar
				if(enviar){
					(document.querySelectorAll('.yt-dialog-send')[0]).click()	 	
				}
			 	localStorage.setItem(channel_id,"1");
		 	}
		 })(user,channel_id,nombre_usuario),timeout_entre_mensajes*n);
		 n++;
	}

}
enviar_mensajes();
/*
var channel_id = (document.querySelectorAll('.send-button-info')[0]).getAttribute('data-channel-id');
(document.querySelectorAll('.send-button-info')[0]).children[0].click()
document.querySelectorAll('textarea[name=content]')[0].value = '234234'
localStorage.setItem("producers", "1"); localStorage.getItem("producers");
*/