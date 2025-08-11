export interface ITemplate {
   type: string;
   style: object | null;
   children: ITemplate[];
}
