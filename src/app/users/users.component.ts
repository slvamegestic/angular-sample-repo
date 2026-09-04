import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api-service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private api: ApiService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.api.getUsers().subscribe((data: any) => {
      this.users = data.slice(0, 10);
      this.cdr.detectChanges();
    });
  }
}
