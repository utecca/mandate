export class Notification {

    public visible = true;

    constructor(public title: string, public text?: string, public type?, public icon?) {
        this.title = title;

        return this;
    }
}
