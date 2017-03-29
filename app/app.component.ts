import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <div class="jumbotron">
    <h1>This is another todo List</h1>
    </div>
    <div [class]="currentCategory.special" *ngFor="let currentCategory of categoryArray" (click)="selectFocus(currentCategory)">
        {{currentCategory.name}}
    </div>
    <button type="button" class="btn btn-primary" (click)="showAll()">Show All</button>
    <br>
    <br>
    <div class="col-xs-4" *ngFor="let currentTask of displayTasks" (click)="selectTask(currentTask)">
        <div [class]="currentTask.special">
            <div class="panel-heading">
                {{currentTask.description}}
            </div>
        </div>
    </div>
    `
})

export class AppComponent {
    public currentTime = new Date();
    public month: number = this.currentTime.getMonth() + 1;
    public day: number = this.currentTime.getDate();
    public year: number = this.currentTime.getFullYear();

    public currentFocus: Category = null;
    public selectedTask: Task = null;
    public categoryArray: Category[] = [
        new Category('Work'),
        new Category('Fun'),
        new Category('Taxes')
    ];
    public taskArray: Task[] = [
        new Task('Do homework', 1, 'Work'),
        new Task('Do other homework', 1, 'Work'),
        new Task('Do the dougie', 3, 'Work'),
        new Task('Dance Dance Dance', 1, 'Fun'),
        new Task('Live a little', 1, 'Fun'),
        new Task('Make fun of small children', 1, 'Fun'),
        new Task('Live', 2, 'Taxes'),
        new Task('Breath', 2, 'Taxes'),
        new Task('Pay Uncle Sam', 2, 'Taxes')
    ];

    public displayTasks: Task[] = [];

    public selectFocus(clickedCategory: Category) {
        if(this.currentFocus) {
            this.currentFocus.special = "well";
        };
        this.currentFocus = clickedCategory;
        this.currentFocus.special = "panel panel-info";
        this.displayTasks = [];
        for (let oneTask of this.taskArray) {
            if (oneTask.category === this.currentFocus.name) {
                this.displayTasks.push(oneTask);
            };
        };
    };

    public selectTask(clickedTask: Task) {
        if(this.selectedTask) {
            this.selectedTask.special = "panel-primary";
        };
        this.selectedTask = clickedTask;
        this.selectedTask.special = "panel-danger";
    };

    public showAll() {
        this.displayTasks = [];
        for (let oneTask of this.taskArray) {
            this.displayTasks.push(oneTask);
        };
    };
}

export class Category {
    public special: string = "well";
    constructor(public name: string) {};
}

export class Task {
    public special: string = "panel-primary";
    public done: boolean = false;
    constructor(public description: string, public priority: number, public category: string) {};
}
