using Wemogy.CQRS.Queries.Abstractions;

namespace <%= namespace %>.<%= name %>;

public class <%= name %>QueryValidator : FluentValidationQueryValidator<<%= name %>Query>
{
    public <%= name %>QueryValidator()
    {
        // TODO: Add validation rules
    }
}
