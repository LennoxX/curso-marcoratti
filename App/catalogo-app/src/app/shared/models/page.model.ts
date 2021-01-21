
export class Page<T>{
   public content: T[];
   public pageIndex: number;
   public size: number;
   public totalElements: number;
   public totalPages: number;

   constructor(){}
}    