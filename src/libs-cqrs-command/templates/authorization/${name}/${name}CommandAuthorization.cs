using System.Threading.Tasks;
using Wemogy.CQRS.Commands.Abstractions;

namespace <%= namespace %>.<%= name %>;

public class <%= name %>CommandAuthorization : ICommandAuthorization<<%= name %>Command>
{
    public Task AuthorizeAsync(<%= name %>Command command)
    {
        throw new System.NotImplementedException();
    }
}
