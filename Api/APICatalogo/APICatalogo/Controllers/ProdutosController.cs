using APICatalogo.Models;
using APICatalogo.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace APICatalogo.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly IUnitOfWork _uof;

        public ProdutosController(IUnitOfWork context)
        {
            _uof = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Produto>> Get()
        {
            try
            {
                return Ok(_uof.ProdutoRepository.Get().ToList());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um erro ao processar sua solicitação.");
            }
           
        }

        [HttpGet("paged")]
        public ActionResult<IEnumerable<Produto>> GetPaginado([FromQuery] int pageNumber, [FromQuery] int pageSize)
        {
            var page = pageNumber > 0 ? pageNumber : 1;
            var size = pageSize > 0 && pageSize <10 ? pageSize : 10;

            return _uof.ProdutoRepository.Get().OrderBy(p => p.Nome).Skip((page - 1) * size).Take(size).ToList();

        }

        [HttpGet("{id}", Name ="ObterProduto")]
        public ActionResult<Produto> Get(int id)
        {
            try
            {
                var produto = _uof.ProdutoRepository.GetById(p => p.Id == id);
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
                produto.DataCadastro = System.DateTime.Now;
                _uof.ProdutoRepository.Add(produto);
                _uof.Commit();
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
                _uof.ProdutoRepository.Update(produto);
                _uof.Commit();
                return Ok(_uof.ProdutoRepository.GetById(p => p.Id == produto.Id));
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
                var produto = _uof.ProdutoRepository.GetById(p => p.Id == id);
                if (produto == null)
                {
                    return NotFound();
                }
                _uof.ProdutoRepository.Delete(produto);
                _uof.Commit();
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um erro ao processar sua solicitação.");
            }
           
        }
    }
}
