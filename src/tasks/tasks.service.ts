import { Injectable } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';


@Injectable()
export class TasksService {
    // private tasks : Task[]=[]

constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
)
{}


async getAllTasks(filterDto:GetTasksFilterDto, 
    user: User):Promise<Task[]>{
 return this.taskRepository.getAllTasks(filterDto,user)
}

//     getAllTasks(): Task[]{
//         return this.tasks
//     }

//     getTaskWithFilter(filterDto:GetTasksFilterDto) : Task[]{
//         const {status , search} = filterDto
//         let tasks = this.getAllTasks()
//         if(status){
//             tasks = tasks.filter(task => task.status===status)
//         }

//         if(search){
//             tasks = tasks.filter(task =>task.title.includes(search) || task.description.includes(search))
//         }
//         return tasks
//     }
async getTaskById(id : number, 
    user: User) : Promise<Task> {
    //const found = await this.taskRepository.findOne(id);
    const found = await this.taskRepository.findOne({where : {id,userId:user.id}});
    if(!found){
           throw new NotFoundException(`task with the id ${id} not found`)
             }
    return found;
}
    
//     getTaskById(id : string): Task{
//         const found =  this.tasks.find(task => task.id === id)
//         if(!found){
//         throw new NotFoundException(`task with the id ${id} not found`)
//         }
//         return found;
    
//     }

async createTask(
    createTaskDto:CreateTaskDto,
    user:User) : Promise<Task>{
return this.taskRepository.createTask(createTaskDto,user);
}


//     createTask(createTaskDto:CreateTaskDto): Task {
//         const {title, description} = createTaskDto
//     const task : Task = {
//         id : uuid.v1(),
//         title,
//         description,
//         status:TaskStatus.OPEN  
//      }
//     this.tasks.push(task);
//     return task;
//     }

async deleteTask(id :number) : Promise<void> {
  const result =  await this.taskRepository.delete(id);
if (result.affected===0){
    throw new NotFoundException(`task with the id ${id} not found`)
}

}

// deleteTask(id : string): void {
//     const found =this.getTaskById(id)

//     this.tasks = this.tasks.filter(task => task.id !== found.id)
// }

// async updateTaskStatus(id : number , status : TaskStatus): Promise<Task>{
// const task = await this.getTaskById(id) 
//     task.status = status
//     await task.save()
//     return task
// }
// updateTaskStatus(id : string , status : TaskStatus): Task{
//     const task = this.getTaskById(id)
//         task.status = status
//         return task
// }

}
