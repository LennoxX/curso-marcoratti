import { Categoria } from '../../categorias/models/categoria.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Cliente extends BaseResourceModel {
    constructor(
        public nome?: string,
        public sobrenome?: string,
        public email?: string,
        public dataCadastro?: Date,
        public ativo?: boolean,
    ) {
        super();
    }

    static fromJson(jsonData: any): Cliente {
        return Object.assign(new Cliente(), jsonData);
    }
}