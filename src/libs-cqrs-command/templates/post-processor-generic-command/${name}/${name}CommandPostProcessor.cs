using System.Threading.Tasks;
using Wemogy.CQRS.Commands.Abstractions;

namespace <%= namespace %>.<%= name %>;

public class <%= name %>CommandPostProcessor : ICommandPostProcessor<<%= name %>Command, <%= resultType %>>
{
    public Task ProcessAsync(<%= name %>Command command, <%= resultType %> result)
    {
        throw new System.NotImplementedException();
    }
}
