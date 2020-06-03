import { Todo, TodoList } from '../classes';
import { todoList } from '../index.js';



//referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltors     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = (todo) => {
    
        const htmlTodo =`
            <li class="${ (todo.completado) ? 'completed': '' }" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked': ''}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

        const div = document.createElement('div');
        div.innerHTML = htmlTodo;


        //necesitamos un div para añadir un li, pero realmente no añadimos el div, porque necesitamos que esté ordenado
        //con li sucede, con div no.Por eso no añadimos div sino li (firstElementChild).

        divTodoList.append(div.firstElementChild);

        return div.firstElementChild;
}


//Eventos
txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) =>{
        console.log('click');
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
