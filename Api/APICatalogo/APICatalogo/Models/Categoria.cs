using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APICatalogo.Models
{
    [Table("Categorias")]
    public class Categoria
    {

        public Categoria()
        {
            Produtos = new Collection<Produto>();
        }

        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Campo 'NOME' obrigatório")]
        [MaxLength(80, ErrorMessage = "Máximo de 80 Caracteres")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Campo 'Imagem URL' obrigatório")]
        [MaxLength(300, ErrorMessage = "Máximo de 300 Caracteres")]
        public string ImagemUrl { get; set; }

        public ICollection<Produto> Produtos { get; set; }

    }
}
