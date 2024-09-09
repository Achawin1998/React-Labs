export class Project {
    id: number | undefined;
    name: string = '';
    description: string = '';
    imageUrl: string = '';
    contractTypeId: number | undefined;
    contractSignedOn: Date = new Date();
    budget: number = 0;
    isActive: boolean = false;
    get isNew(): boolean {
        return this.id === undefined;
    }


    constructor(iniitializer?:any)  {
        if (!iniitializer) return;
        if (iniitializer.id) this.id = iniitializer.id;
        if (iniitializer.name) this.name = iniitializer.name;
        if (iniitializer.description) this.description = iniitializer.description;
        if (iniitializer.imageUrl) this.imageUrl = iniitializer.imageUrl;
        if (iniitializer.contractTypeId) this.contractTypeId = iniitializer.contractTypeId;
        if (iniitializer.contractSignedOn) this.contractSignedOn = iniitializer.contractSignedOn;
        if (iniitializer.budget) this.budget = iniitializer.budget;
        if (iniitializer.isActive) this.isActive = iniitializer.isActive;
    }       



}