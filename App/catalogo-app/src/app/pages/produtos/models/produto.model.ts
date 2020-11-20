import { Categoria } from './../../categorias/models/categoria.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Produto extends BaseResourceModel {
    constructor(
        public nome?: string,
        public descricao?: string,
        public preco?: number,        
        public imagemUrl?: string,
        public estoque?: number,
        public dataCadastro?: Date,
        public categoria?: Categoria,
        public categoriaId?: number
    ) {
        super();
    }

    static fromJson(jsonData: any): Produto {
        return Object.assign(new Produto(), jsonData);
    }
}