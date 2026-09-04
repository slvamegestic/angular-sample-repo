import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private http = inject(HttpClient);
    private todosUrl = 'https://jsonplaceholder.typicode.com/todos';

    getTodos(){
          return this.http.get(this.todosUrl);
    }

    postTodos(payload: any){
        return this.http.post(this.todosUrl, payload);
    }

    getUsers(){
      return this.http.get('https://jsonplaceholder.typicode.com/users');
    }


    getTask(id:any){
      return this.http.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
    }

   
    getUser(id:any){
      return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    }

    
    deleteTask(id: number){
      return this.http.delete(`${this.todosUrl}/${id}`);
    }

    updateTask(id: number, task: any){
      return this.http.put(`${this.todosUrl}/${id}`, task);
    }
}

