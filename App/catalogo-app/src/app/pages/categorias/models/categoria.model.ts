import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Categoria extends BaseResourceModel {
    constructor(
        public nome?: string,
        public sobrenome?: string,
        public telefone?: string
    ) {
        super();
    }

    static fromJson(jsonData: any): Categoria {
        return Object.assign(new Categoria(), jsonData);
    }
}