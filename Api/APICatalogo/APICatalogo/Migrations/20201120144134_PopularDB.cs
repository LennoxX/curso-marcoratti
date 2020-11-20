using Microsoft.EntityFrameworkCore.Migrations;

namespace APICatalogo.Migrations
{
    public partial class PopularDB : Migration
    {
        protected override void Up(MigrationBuilder mb)
        {
            mb.Sql("INSERT INTO Categorias(Nome, ImagemURL) VALUES('Bebidas', 'http://buteconosso.com/wp-content/uploads/2014/03/Whisky.jpg')");
            mb.Sql("INSERT INTO Categorias(Nome, ImagemURL) VALUES('Comidas', 'https://www.viaplastembalagens.com.br/img/posts/postagens/20190111151112161/800/15111211012019.jpg')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
