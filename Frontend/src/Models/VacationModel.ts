export class VacationModel {
    public id: number;
    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public img: File;
    public imageName: string;
    public isMyLiked?: number;
    public likesCount?: number;
}
