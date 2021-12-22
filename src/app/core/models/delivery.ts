export class Delivery{
    deliveryId!:number;
    deliveryName!:string;
    deliveryType!:string;
    isSelected!:boolean;

    constructor(deliveryId:number){
        this.deliveryId = deliveryId;
    }
}