
const body=document.querySelector('.contenedor');
const modal=document.querySelector('.modal');
const lista_faltantes=document.querySelector('.lista_faltantes');
const cerrar=document.querySelector('.cerrar');
const mas_paises=document.querySelector('.mas_paises');
const size=window.innerWidth;

let indice;
let faltantes=[];
let contador=0;
let estado_botones=0;
let cadena,cadenaNuevos,cadenaTemporal;
let limite;
var seleccionados;
var object1;
var object2;

cerrar.addEventListener('click',()=>{
	cadenaNuevos=[];
	cadenaTemporal=[];
	seleccionados= document.querySelectorAll('.seleccionado');

	for(let i=0;i<seleccionados.length;i++){
		cadenaNuevos.push(parseInt(seleccionados[i].id));
	}

	for(let i=0;i<cadena.length;i++){
		if(cadenaNuevos.includes(cadena[i])){
		    cadenaTemporal.push(cadena[i]);
		}
		else{
     
       document.querySelector(`.container[id='${cadena[i]}']`).querySelector('.bandera').remove();
       document.querySelector(`.container[id='${cadena[i]}']`).querySelector('.nombre').remove();
       document.querySelector(`.container[id='${cadena[i]}']`).querySelector('span').remove();
       document.querySelector(`.container[id='${cadena[i]}']`).querySelector('input').remove();
       document.querySelector(`.container[id='${cadena[i]}']`).querySelector('.container2').remove();
       document.querySelector(`.container[id='${cadena[i]}']`).querySelector('.container3').remove();
       document.querySelector(`.container[id='${cadena[i]}']`).remove(); 
		}
	}
	for(let i=0;i<cadenaNuevos.length;i++){
		if(!cadena.includes(cadenaNuevos[i])){
		    cadenaTemporal.push(cadenaNuevos[i]);
		    llenarPagina(object1,cadenaNuevos[i]);
		}
	}

 	cadena=cadenaTemporal;
	llenarFaltantes();
	convertirDivisas(object1,object2);
	modal.style.opacity='0';
	setTimeout(e=>modal.classList.toggle('oculto'),500);
});

leerPaises();

async function leerPaises() {
  const requestURL ="https://raw.githubusercontent.com/joangute/divisas/main/files/paises.json";
  const request = new Request(requestURL);
  const response = await fetch(request);
  const paises = await response.json();

  const requestURL2 ="https://raw.githubusercontent.com/joangute/divisas/main/files/divisas.json";
  const request2 = new Request(requestURL2);
  const response2 = await fetch(request2);
  const divisas = await response2.json();

  llenarPaises(paises, divisas);
  convertirDivisas(paises,divisas);
}

mas_paises.addEventListener('click',()=>{
      modal.classList.toggle('oculto');
    	modal.querySelector('h2').textContent=`Selecciona paises de esta lista`;
    	modal.style.opacity='1';
});


function llenarPaises(obj,obj2){
	 object1=obj;
	 object2=obj2;
	 if(size>480){
	 cadena=[7,15,22,1,5,6,8,9,25,26,33,34];
	 limite=12;
		}
		else{
		cadena=[7,15,22,1,5,6,8,9,26,33];
		limite=10;
		}

	 cadena.forEach(e=>llenarPagina(obj,e));
	 llenarFaltantes();
	 elementosFaltantes(obj,obj2);
}

function llenarFaltantes(){
	faltantes=[];
	for(let i=0;i<35;i++){
			if (cadena.indexOf(i)==-1){
				faltantes.push(i);
			}
		}
}

function llenarPagina(obj,i){

		let container, container2, container3, bandera, nombre, input, codigo,bander,caja,cajaValue;

		container= document.createElement('div');
		container.classList.add('container','flex');
		container.setAttribute('id',i);

		container2= document.createElement('div');
	  container2.classList.add('container2');

		container3= document.createElement('div');
		container3.classList.add('container3');

		bandera=document.createElement('span');
		bandera.classList.add('bandera');
		bandera.style.backgroundImage=`url(${obj[i].flag})`;

		bander=document.createElement('span');
		bander.classList.add('bander', 'oculto');

		bandera.appendChild(bander);

		nombre=document.createElement('span');
		nombre.classList.add('nombre');
		nombre.textContent=obj[i].name;

		
		container2.appendChild(bandera);
		container2.appendChild(nombre);

		input=document.createElement('input');
		input.setAttribute('type','text');
		input.setAttribute('placeholder',`${obj[i].currency.symbol_native} 0.0`);
		
        
	  codigo=document.createElement('span');
	  codigo.textContent=obj[i].currency.code;

	  container3.appendChild(codigo);
	  container3.appendChild(input);

	  if(size>480){
	     bandera.addEventListener('mouseenter',agregarIcono);
	     bandera.addEventListener('mouseleave',quitarIcono);
	  }
    else{ 
	     bandera.addEventListener('click',agregarIcono);
	  }

   /* nombre.addEventListener('click', ()=>{
    	indice=container.id;
    	modal.classList.toggle('oculto');
    	modal.querySelector('h2').textContent=`Cambiar ${obj[indice].name} por:`;
    	modal.style.opacity='1';
    	
    });*/

    bandera.addEventListener('click',(e)=>{
      contador++;
      container.classList.toggle('seleccionado');

      if(size>480){
      	container.querySelector('.bandera').removeEventListener('mouseleave',quitarIcono);
      }
   
      if(contador<2){
 				indice=container.id;

      }
      else{
    
        caja=document.querySelector(`.container[id='${indice}']`);
      	cajaValue=caja.querySelector('.container3>input').value;

			  if(container.id!=caja.id){      
      		caja.querySelector('.bander').style.opacity=0;
			  	caja.querySelector('.bandera').style.filter='sepia(50%)';
			  	setTimeout(()=>{
      
            container.classList.toggle('seleccionado');
            caja.classList.toggle('seleccionado');
 
            container.querySelector('.bandera').style.backgroundImage=`url('${obj[indice].flag}')`;
						container.querySelector('.container2>span:nth-child(2)').textContent=obj[indice].name;
						container.querySelector('.container3>span').textContent=obj[indice].currency.code;
						container.querySelector('input').placeholder=obj[indice].currency.symbol_native;
						
						caja.querySelector('.bandera').style.backgroundImage=`url('${obj[container.id].flag}')`;
						caja.querySelector('.container2>span:nth-child(2)').textContent=obj[container.id].name;
						caja.querySelector('.container3>span').textContent=obj[container.id].currency.code;
						caja.querySelector('input').placeholder=obj[container.id].currency.symbol_native;
            caja.querySelector('.bander').classList.remove('oculto');

            if(size <=480){
            	 	container.querySelector('.bander').style.opacity=0;
			      		container.querySelector('.bandera').style.filter='sepia(50%)';
            		container.querySelector('.bander').classList.remove('oculto');
            }

            caja.querySelector('input').value=container.querySelector('.container3>input').value;
            container.querySelector('input').value=cajaValue;
			      container.querySelector('.bandera').addEventListener('mouseleave',quitarIcono);
            caja.querySelector('.bandera').addEventListener('mouseleave',quitarIcono);
						caja.id=container.id;
						container.id=indice;

      		},300);

			  }
			  else{
			  	if(size>480){
			  		container.querySelector('.bandera').addEventListener('mouseleave',quitarIcono);
			  	}
			  	else{
			  		quitarIcono(e);
			  	}
        
			  }
      	 	
      	contador=0;
      }
    });

		container.appendChild(container2);
		container.appendChild(container3);
		body.appendChild(container);
}

function agregarIcono(e){
  
      e.currentTarget.querySelector('.bander').classList.remove('oculto');
		  e.currentTarget.querySelector('.bander').style.opacity=1;
		  e.currentTarget.style.filter='sepia(0)';
}
function quitarIcono(e){
   	     	  
	    e.currentTarget.querySelector('.bander').style.opacity=0;
	    e.currentTarget.style.filter='sepia(50%)';
	    let id=e.currentTarget.parentElement.parentElement.id;
	         setTimeout(()=>{
	       	   document.querySelector(`.container[id="${id}"]`).querySelector('.bander').classList.add('oculto');
	         
	         },300);

}

function convertirDivisas(obj,obj2){

	const inputs=document.querySelectorAll('input[type="text"]');
	const containers=document.querySelectorAll('.container');
	let val,temp_value;
	const exp=/(^[0-9]+\.[0-9]+?)|(^[0-9]+\.?)|(^[0-9]+?)/;

		for (let i=0;i<inputs.length;i++){

			inputs[i].addEventListener('input',e=>{
			if(!exp.test(inputs[i].value)){
				 	temp_value=inputs[i].value;
				 	temp_value=temp_value.substr(0,temp_value.length-2);
				 	inputs[i].value=temp_value;
				}
			else{
				 	val=inputs[i].value/obj2.data[obj[containers[i].id].currency.code].value;
				 	for(let j=0;j<inputs.length;j++){
				 		if(j!=i){
				 			inputs[j].value=(val*obj2.data[obj[containers[j].id].currency.code].value).toFixed(2);	
				 		}
				 }			     	
			}
			if(inputs[i].value==''){
				 		inputs.forEach(e=>e.value='');
				 }                
			});
		}
}
		

function elementosFaltantes(obj,obj2){
	let elemento,bandera,nombre, contar;

	for(let i=0;i<35;i++){


				elemento=document.createElement('div');
	  		elemento.classList.add('elemento_faltante');
	  		elemento.setAttribute('id',i);

	  		bandera= document.createElement('span');
	  		bandera.classList.add('bandera_faltante');
	  		bandera.style.backgroundImage=`url('${obj[i].flag}')`;
	  		
	  		nombre=document.createElement('span');
	  		nombre.classList.add('nombre_faltante');
	  		nombre.textContent=obj[i].name;

	  		elemento.appendChild(bandera);
	  		elemento.appendChild(nombre);
	  		if (faltantes.indexOf(i)==-1){
				elemento.classList.toggle('seleccionado');
			  }
				elemento.addEventListener('click',e=>{
					contar= document.querySelectorAll('.seleccionado').length;

					if(e.currentTarget.classList.contains('seleccionado')){
						e.currentTarget.classList.toggle('seleccionado');

					}
					else{
						if(contar==limite){
             alert('Limite Maximo alcanzado,deseleccione un pais primero');
            }
            else{
            	e.currentTarget.classList.toggle('seleccionado');
            }
					}           
				});
	  		lista_faltantes.appendChild(elemento);  
}
	  	
}


 
