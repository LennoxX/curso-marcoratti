import { Produto } from './../../produtos/models/produto.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Categoria extends BaseResourceModel {
    constructor(
        public nome?: string,
        public imagemUrl?: string,
        public produtos?: Produto[]
    ) {
        super();
        this.produtos = new Array();
    }

    static fromJson(jsonData: any): Categoria {
        return Object.assign(new Categoria(), jsonData);
    }
}