
interface Item {
    gender: 'female' | 'male';
    name: string;
    email: string;
}


export class Table{
    public list: Array<Item>

    private api
    constructor(api:any){
        this.list = []
        this.api = api
    }

    hnadleGetList(){
        this.api.getList(this.list)
    }

}