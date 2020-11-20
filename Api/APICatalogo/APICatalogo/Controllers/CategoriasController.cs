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
    [Route("api/[Controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {

        private readonly AppDbContext _context;

        public CategoriasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Categoria>> Get()
        {
            try
            {
                return Ok(_context.Categorias.AsNoTracking().ToList());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um erro ao processar sua solicitação.");
            }
            
        }

        [HttpGet("{id}", Name ="ObterCategoria")]
        public ActionResult<Categoria> Get(int id)
        {
            try
            {
                var categoria = _context.Categorias.AsNoTracking().Include(x => x.Produtos).FirstOrDefault(c => c.Id == id);
                if (categoria == null)
                {
                    return NotFound("Categoria não encontrada");
                }
                return Ok(categoria);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um erro ao processar sua solicitação.");
            }
          
           
        }

        [HttpPost]
        public ActionResult<Categoria> Post([FromBody] Categoria categoria)
        {
            try
            {
                _context.Categorias.Add(categoria);
                _context.SaveChanges();
                return CreatedAtRoute("ObterCategoria", new { id = categoria.Id }, categoria);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um erro ao processar sua solicitação.");
            }
         
        }

        [HttpPut]
        public ActionResult<Categoria> Put([FromBody] Categoria categoria)
        {
            try
            {
                _context.Entry(categoria).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(_context.Categorias.AsNoTracking().FirstOrDefault(p => p.Id == categoria.Id));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um erro ao processar sua solicitação.");
            }
            
        }

        [HttpDelete("{id}")]
        public ActionResult<Categoria> Delete(int id)
        {
            try
            {
                var categorias = _context.Categorias.AsNoTracking().FirstOrDefault(p => p.Id == id);
                if (categorias == null)
                {
                    return NotFound();
                }
                _context.Categorias.Remove(categorias);
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
