import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit{
 
  isEditable = false;
  editMode: boolean[] = [false];
  addNewPerson: boolean[] = [false];
  users: User[] = [];
  newID=0
  textareaAddNewName!:string;
  textareaAddNewSurname!:string;
  textareaAddNewDateOfBirth!:string;
  textareaAddNewNumber!:string;
  textareaAddNewEmail!:string;
  textareaAddNewGender!:string;

  textareaName!:string;
  textareaSurname!:string;
  textareaDateOfBirth!:string;
  textareaNumber!:string;
  textareaEmail!:string;
  textareaGender!:string;
  screenWidth!: number;
  constructor(private userService: UserService,private toast: ToastrService) {
    this.screenWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });
   }

  ngOnInit(): void {
   this.getAllUsers()

  }
  
  getAllUsers(){
    this.userService.getAllUsers().subscribe((res: User[])=>{
      this.users = res;
      if (this.users.length > 0) {
        this.newID = this.users[this.users.length-1].id;
        this.newID +=1;
      } else {
        this.newID = 0; 
      }
    })
  
  }
  isMobile(): boolean {
   
    return this.screenWidth < 992;
    
  }

   isTablet(): boolean {
    return this.screenWidth >= 768 && this.screenWidth < 992;
  }

   isDesktop(): boolean {
    return this.screenWidth >= 992;
  }

 onEditClick(user:User){
  this.textareaName = user.name;
  this.textareaSurname = user.surname;
  this.textareaDateOfBirth = user.dateOfBirth;
  this.textareaNumber = user.number;
  this.textareaEmail = user.email;
  this.textareaGender= user.gender;

  for(let i = 0; i< this.newID;i++){
      this.editMode[i] = false;
    }
    this.editMode[user.id] = true;
 }

  onSaveClick(user:User){
    const userUpdate = {
      id: user.id,
      name: this.textareaName,
      surname: this.textareaSurname,
      dateOfBirth: this.textareaDateOfBirth,
      number: this.textareaNumber,
      email: this.textareaEmail,
      gender: this.textareaGender
    };
      this.userService.updateUser(userUpdate).subscribe(
        (response) => {
          this.toast.success(response.message);
          this.getAllUsers()
          this.editMode[user.id] = false;
        },
        (error) => {
          this.toast.error(error.error.message,'Došlo je do pogreške.');
        }
      );
    this.editMode[user.id] = true;
  }

  onCancelClick(index:number){
    this.editMode[index] = false;
    this.addNewPerson[index]=false;
   
  }
  onDeleteClick(user:User){
    for(let i = 0; i< this.newID;i++){
      this.editMode[i] = false;
    }
    this.userService.deleteUser(user.id).subscribe(
      (response) => {
        this.toast.success(response.message);
        this.getAllUsers()
      },
      (error) => {
        this.toast.error(error.error.message,'Došlo je do pogreške.');
      }
    );
    this.editMode[user.id] = false;
  }

  onAddNewClick(index:number){
    this.addNewPerson[index]=true;
    this.textareaAddNewName = '';
    this.textareaAddNewSurname= '';
    this.textareaAddNewDateOfBirth = '';
    this.textareaAddNewNumber='';
    this.textareaAddNewEmail = '';   
    this.textareaAddNewGender = '';
  }

  onAddUserClick(){
    const user = {
      id: this.newID,
      name: this.textareaAddNewName,
      surname: this.textareaAddNewSurname,
      dateOfBirth: this.textareaAddNewDateOfBirth,
      number: this.textareaAddNewNumber,
      email: this.textareaAddNewEmail,
      gender: this.textareaAddNewGender
    };
   
      this.userService.addUser(user).subscribe(
        (response) => {
          this.toast.success( response.message);
          this.getAllUsers()
          this.addNewPerson[user.id] = false;
        },
        (error) => {
          this.toast.error(error.error.message,'Došlo je do pogreške.');
          
        }
      );
  }
}
