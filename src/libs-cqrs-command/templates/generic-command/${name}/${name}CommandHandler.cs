using System.Threading.Tasks;
using Wemogy.CQRS.Commands.Abstractions;

namespace <%= namespace %>.<%= name %>;

public class <%= name %>CommandHandler : ICommandHandler<<%= name %>Command, <%= resultType %>>
{
    public Task<<%= resultType %>> HandleAsync(<%= name %>Command command)
    {
        throw new System.NotImplementedException();
    }
}
