import { Todo, TodoList } from '../classes';
import { todoList } from '../index.js';



//referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltors     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

const spanPendientes = document.querySelector('.todo-count');
let tareasPendientes = 0;
let prioridadValor;

//segun el valor cargamos un color
const cargaColor = (valorRadiobtn) =>{
    
    let color;
    switch(valorRadiobtn){
        case '0':
          color = 'green';
          break;

        case '1':
          color = 'orange';
          break;

         default:  
          color = 'red';
          break;
    }
   
    return color;
}


export const crearTodoHtml = (todo) => {
        const htmlTodo =`
            <li class="${ (todo.completado) ? 'completed': '' }" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked': ''}>
                <label style ="color: ${cargaColor(todo.prioridad)}">${todo.tarea}</label>
                <button class="destroy">X</button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

        const div = document.createElement('div');
        div.innerHTML = htmlTodo;

        //necesitamos un div para añadir un li, pero realmente no añadimos el div, porque necesitamos que esté ordenado
        //con li sucede, con div no.Por eso no añadimos div sino li (firstElementChild).

        alterarNumPendientes();
        divTodoList.append(div.firstElementChild);
         
        return div.firstElementChild;
}

const alterarNumPendientes = () =>{

    tareasPendientes =  todoList.contarPendientes();
    console.log(`tareas pendientes hay: ${tareasPendientes}`);
    const spPendientes = `<span class="todo-count"><strong>${tareasPendientes}</strong> pendiente(s)</span>`;
    spanPendientes.innerHTML = spPendientes;
    return spanPendientes;
}

//Eventos
txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        console.log(event);

        let formChecks = document.getElementsByClassName('form-check-input');
       
        //buscamos color segun radio buton
        for(let j = 0; j<formChecks.length; j++){
            if (formChecks[j].checked)
               prioridadValor = formChecks[j].value;
        }

        console.log(`creo nuevo todo con prioridad ${prioridadValor}`);
        const nuevoTodo = new Todo(txtInput.value, prioridadValor);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
        console.log(`total de todoList despues de crear ${todoList.length}`);
    }
});

divTodoList.addEventListener('click', (event) =>{
       
    const nombreElemento = event.target.localName; //input, label, button
    
    //el 1º parentElement muestra el view, que contiene el label, input y checkbox, pero buscamos 
    //el li, por eso repetimos parentElement
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input') ){
        todoList.marcarCompletado(todoId);

        //añadimos classList para seleccionar la clase que queremos que cambie, y le asignamos .toggle 
        //porque la queremos modificar, indicamos el atributo, completed
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        
        todoList.eliminarTodo(todoId);

        //eliminamos el todo del html
        divTodoList.removeChild(todoElemento);
    }
   
    alterarNumPendientes();
});

btnBorrar.addEventListener('click', ()=>{
    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length -1; i >= 0; i--){
        const elemento = divTodoList.children[i];
       
        //los completados son elementos de clase completed,
        //simplemente miramos si lo es, entonces es que está completa
        if (elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }

    alterarNumPendientes();
});


ulFiltors.addEventListener('click', (event) =>{
   const filtro = event.target.text;
   if (!filtro) {return;}

   anchorFiltros.forEach(elem => elem.classList.remove('selected') );
   event.target.classList.add('selected');
   
   for(const elemento of divTodoList.children){
      elemento.classList.remove('hidden');
      const completado = elemento.classList.contains('completed');

      switch(filtro) {
          case 'Pendientes':
              if (completado){
                elemento.classList.add('hidden');
              }
            break;

          case 'Completados':
              if (!completado){
                elemento.classList.add('hidden');   
              }
            break;
      }
   }

});
