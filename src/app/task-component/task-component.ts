import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './task-component.html',
  styleUrl: './task-component-new.css'
})

export class TaskComponent implements OnInit {
  todos: any[] = [];
  allTasks: any[] = [];
  name: string = 'My Todo List';
  isLoading: boolean = false;
  today = new Date();
  showModal: boolean = false;
  filter = 'all';
  editingTaskId: number | null = null;

  newTitle: string = '';
  newPriority: string = 'Low';

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    priority: new FormControl('Low')
  });

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.isLoading = true;
    this.api.getTodos().subscribe((todoList: any) => {
      this.allTasks = todoList.slice(0, 20);
      this.todos = [...this.allTasks];
      setTimeout(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }, 2000);
    });
  }

  openEditModal(task: any): void {
    this.editingTaskId = task.id;
    this.taskForm.patchValue({
      title: task.title,
      priority: task.priority || 'Medium'
    });
    this.showModal = true;
  }

  openAddModal(): void {
    this.editingTaskId = null;
    this.taskForm.reset();
    this.showModal = true;
  }

  closeAddModal(): void {
    this.showModal = false;
    this.taskForm.reset();
    this.editingTaskId = null;
  }

  addTodo(): void {
    const formValue = this.taskForm.value;
    if(this.editingTaskId !== null) {
       this.api.updateTask(this.editingTaskId, formValue).subscribe(() => { 

          this.todos = this.todos.map(task => {
            if (task.id === this.editingTaskId) {
                return formValue;
            }
            return task;
          })
        this.closeAddModal();
        this.cdr.detectChanges();
     
       })

    }
    else {
      this.api.postTodos(formValue).subscribe(() => {
        this.todos.unshift(formValue);
        this.closeAddModal();
        this.cdr.detectChanges();
      });
  }
  }

  setFilter(v: string): void {
   if(v == 'pending'){
    this.todos = this.allTasks.filter(task => !task.completed);  
   }
   else if(v == 'done'){
    this.todos = this.allTasks.filter(task => task.completed);  
   }
   else{
    this.todos  = this.allTasks
   }
  }

  remove(task: any): void {
    this.api.deleteTask(task.id).subscribe(() => {
      this.todos = this.todos.filter(item => {
        return item.id !== task.id
      });
      this.cdr.detectChanges();

    })
  }

}
