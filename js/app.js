const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCurso = document.querySelector('#lista-cursos');

cargarEvantListener();

let articuloCarrito = [];

function cargarEvantListener(){
    listaCurso.addEventListener('click', agregarCurso);
    vaciarCarrito.addEventListener('click', BorrarCurso);
    carrito.addEventListener('click', eliminarCarrito);
}

//Funciones
function agregarCurso(evento){
    evento.preventDefault();
    if (evento.target.classList.contains('agregar-carrito')){
        //console.log(evento.target);
        const cusroSeleccionado = evento.target.parentElement.parentElement;
        leerDatosCurso(cusroSeleccionado);
    }
}

function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('precio span').textContent,
        id: curso.querySelector('a').getAtribute('data-id'), // Esto es para obtener el atributo data-id
        cantidad: 1,
    }
    console.log(infoCurso);
    const existe = articuloCarrito.some(curso => curso.id === infoCurso.id); // Esto va ser para verificar si el curso ya existe en el carrito

    if(existe){ //No hay que colocar verdadero o falso
        const curso = articuloCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articuloCarrito = [...curso];

    }else{
        articuloCarrito = [...articuloCarrito, infoCurso]; //Lo que significa 
    }
    articuloCarrito.push(infoCurso);
}

function carritoHTML(){
    limpiarCarrito();
    articuloCarrito.forEach(() => {
        const row = document.createElement('tr');
        row.innerHTML =  `
        <td>
            <img src='${imagen}' width=100 />
        </td>
        <td> 
            ${titulo}
        </td>
        <td> 
            ${precio}
        </td>
        <td> 
            ${cantidad}
        </td>
        <td> 
            <a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>
        `;
console. log(row);
contenedorCarrito.appendChild(row);
    });
    console.log(contenedorCarrito);
    

}

function limpiarCarrito(){
    //Forma lenta
    //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function eliminarCarrito(evento){
    if(evento.target.classList('borrar-curso')){
        const cursoId = evento.target.getAtribute('data-id');
        articuloCarrito = articuloCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}

function BorrarCurso(){
    //Borrar curso del carrito
    articuloCarrito = [];
    carritoHTML();
}