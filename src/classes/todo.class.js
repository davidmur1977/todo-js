export  class Todo {

    //AL recuperar de localStorage se recuperan atributos pero no metodos
    //hacemos desestructuracion de objetos para obtener id, tarea, completado, creado

    //de este modo definimos la instancia y recuperamos los metodos de Todo imprimirClase() por ejemplo
   static fromJson({id, tarea, completado, creado}){
       const tempTodo = new Todo(tarea);

       tempTodo.id = id;
       tempTodo.completado = completado;
       tempTodo.creado = creado;

       return tempTodo;
   }


    constructor(tarea) {
           this.tarea = tarea;

           this.id = new Date().getTime(); //1286871
           this.completado = true;
           this.creado = new Date();
    }

    imprimirClase(){

    }
}