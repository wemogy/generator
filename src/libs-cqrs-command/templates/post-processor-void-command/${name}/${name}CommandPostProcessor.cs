using System.Threading.Tasks;
using Wemogy.CQRS.Commands.Abstractions;

namespace <%= namespace %>.<%= name %>;

public class <%= name %>CommandPostProcessor : ICommandPostProcessor<<%= name %>Command>
{
    public Task ProcessAsync(<%= name %>Command command)
    {
        throw new System.NotImplementedException();
    }
}
