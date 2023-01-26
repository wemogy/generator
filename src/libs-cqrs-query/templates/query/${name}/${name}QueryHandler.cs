using System.Threading;
using System.Threading.Tasks;
using Wemogy.CQRS.Queries.Abstractions;

namespace <%= namespace %>.<%= name %>;

public class <%= name %>QueryHandler : IQueryHandler<<%= name %>Query, <%= resultType %>>
{
    public Task<<%= resultType %>> HandleAsync(<%= name %>Query command, CancellationToken cancellationToken)
    {
        throw new System.NotImplementedException();
    }
}
