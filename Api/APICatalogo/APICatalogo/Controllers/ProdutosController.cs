using APICatalogo.Context;
using APICatalogo.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICatalogo.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProdutosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Produto>> Get()
        {
            try
            {
                return Ok(_context.Produtos.AsNoTracking().ToList());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um erro ao processar sua solicitação.");
            }
           
        }

        [HttpGet("{id}", Name ="ObterProduto")]
        public ActionResult<Produto> Get(int id)
        {
            try
            {
                var produto = _context.Produtos.AsNoTracking().FirstOrDefault(p => p.Id == id);
                if (produto == null)
                {
                    return NotFound("Produto não encontrado");
                }
                return Ok(produto);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um erro ao processar sua solicitação.");
            }
           
        }

        [HttpPost]
        public ActionResult<Produto> Post([FromBody] Produto produto)
        {
            try
            {
                _context.Produtos.Add(produto);
                _context.SaveChanges();
                return CreatedAtRoute("ObterProduto", new { id = produto.Id }, produto);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um erro ao processar sua solicitação.");
            }
           
        }

        [HttpPut]
        public ActionResult<Produto> Put([FromBody] Produto produto)
        {
            try
            {
                _context.Entry(produto).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(_context.Produtos.AsNoTracking().FirstOrDefault(p => p.Id == produto.Id));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um erro ao processar sua solicitação.");
            }
          
        }

        [HttpDelete("{id}")]
        public ActionResult<Produto> Delete(int id)
        {
            try
            {
                var produto = _context.Produtos.AsNoTracking().FirstOrDefault(p => p.Id == id);
                if (produto == null)
                {
                    return NotFound();
                }
                _context.Produtos.Remove(produto);
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um erro ao processar sua solicitação.");
            }
           
        }
    }
}
