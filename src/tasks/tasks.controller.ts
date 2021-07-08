
import { Patch } from '@nestjs/common';
import { Body, Controller, Get, Post , Param, Delete ,Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(@Query() filterDto : GetTasksFilterDto):Task[] {
        console.log(filterDto)
        if(Object.keys(filterDto).length){
         
            return this.tasksService.getTaskWithFilter(filterDto)

        }else{
            return this.tasksService.getAllTasks()
        }
        
    }


    @Get('/:id')
    getTaskById(@Param('id') id :string) : Task {
    return this.tasksService.getTaskById(id)
    }


    @Post()
    createTask ( @Body() createTaskDto:CreateTaskDto ): Task {
       
       return this.tasksService.createTask(createTaskDto)

    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string) : void{
       this.tasksService.deleteTask(id)
    }


    @Patch('/:id/status')
    updateTaskStatus (
        @Param('id') id:string , 
        @Body('status') status:TaskStatus
        ) : Task {
     return this.tasksService.updateTaskStatus(id, status)

    }
}