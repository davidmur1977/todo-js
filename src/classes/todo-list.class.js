import { Todo } from './todo.class';



export class TodoList {
    constructor(){
        this.cargarLocalStorage();
        //this.todos = [];
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {

        //devuelve el array excluyendo el que sea ese id
        this.todos = this.todos.filter( todo => todo.id != id )
        this.guardarLocalStorage();
    }

    marcarCompletado(id){
         for(const todo of this.todos) {

            console.log(id, todo.id);

            //usamos doble porque comparamos un string con un numero (id)
             if(todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
             }
         }
    }

    //contamos los pendientes
    contarPendientes(){
       let total = this.todos.filter( todo => !todo.completado);
       return total.length;
    }


    //filtra los que estén completados
    eliminarCompletados() {
        this.todos = this.todos.filter( todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
          
        //pasamos el array de todos a json perfecto, ya que los parametros de setItem son String, no objeto
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
        //   if (localStorage.getItem('todo')){
        //     this.todos = JSON.parse(localStorage.getItem('todo'));
        //     console.log('cargarLocal: ',this.todos);
             
        //   }else{
        //       this.todos = [];
        //   }

          this.todos = (localStorage.getItem('todo')) 
                       ?JSON.parse(localStorage.getItem('todo')) 
                       : [];

          //el metodo map recibe un objeto, es lo que necesitamos para ejecutar el fromJSon de todo.class   
          //se pasa en mayuscula pq es una propiedad estatica            
         
          //this.todos = this.todos.map(obj => Todo.fromJson( obj ) );

          //el argumento obj en 'obj =>'  es el mismo que en fromJSon(obj) por lo tanto se puede eliminar
          //y reducir la línea a:
          this.todos = this.todos.map(Todo.fromJson);

    }

}