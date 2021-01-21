using APICatalogo.Context;
using APICatalogo.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace APICatalogo.Repositories
{
    public class ProdutoRepository : Repository<Produto>, IProdutoRepository
    {
        public ProdutoRepository(AppDbContext context) : base(context)
        {
        }

        public new IQueryable<Produto> Get()
        {
            return _context.Set<Produto>().Include(p => p.Categoria).AsNoTracking();
        }

        public new Produto GetById(Expression<Func<Produto, bool>> predicate)
        {
            return _context.Set<Produto>().Include(p => p.Categoria).SingleOrDefault(predicate);
        }

        public IEnumerable<Produto> GetProdutosPorPreco()
        {
            return Get().OrderBy(c => c.Preco).ToList();
        }
    }
}
