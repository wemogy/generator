using Wemogy.CQRS.Commands.Abstractions;

namespace <%= namespace %>.<%= name %>;

public class <%= name %>CommandValidator : FluentValidationCommandValidator<<%= name %>Command>
{
    public <%= name %>CommandValidator()
    {
        // ToDo: Add validation rules
    }
}
