using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APICatalogo.Models
{
    public class Produto
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Campo 'NOME' obrigatório")]
        [MaxLength(80, ErrorMessage = "Máximo de 80 Caracteres")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Campo 'Descrição' obrigatório")]
        [MaxLength(80, ErrorMessage = "Máximo de 300 Caracteres")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "Campo 'Preço' obrigatório")]
        public decimal Preco { get; set; }

        [Required(ErrorMessage = "Campo 'Imagem URL' obrigatório")]
        public string ImagemUrl { get; set; }

        public float Estoque { get; set; }

        public DateTime DataCadastro { get; set; }

        public Categoria Categoria { get; set; }

        public int CategoriaId { get; set; }


    }
}
