using System.Threading.Tasks;
using Wemogy.CQRS.Commands.Abstractions;

namespace <%= namespace %>.<%= name %>;

public class <%= name %>CommandValidator : ICommandValidator<<%= name %>Command>
{
    public Task ValidateAsync(<%= name %>Command command)
    {
        throw new System.NotImplementedException();
    }
}
