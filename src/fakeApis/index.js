// import { createServer, Model } from 'miragejs';

// export const setupServer = () => {
//     let server = createServer({
//         models: {
//             todos: Model,
//         },
//         routes() {
//             this.get('/api/todos', (schema) => {
//                 return schema.todos.all();
//             });

//             this.post('/api/todos', (schema, request) => {
//                 const payload = JSON.parse(request.requestBody);
//                 return schema.todos.create(payload);
//             });

//             this.post('/api/updateTodo', (schema, request) => {
//                 const id = JSON.parse(request.requestBody);
//                 const currTodo = schema.todos.find(id);
//                 currTodo.update({ isChecked: !currTodo.isChecked });
//                 return currTodo;
//             });
//         },
//     });
// };
