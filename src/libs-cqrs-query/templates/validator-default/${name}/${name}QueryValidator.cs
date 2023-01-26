using Wemogy.CQRS.Queries.Abstractions;

namespace <%= namespace %>.<%= name %>;

public class <%= name %>QueryValidator : IQueryValidator<<%= name %>Query>
{
    public void Validate(<%= name %>Query query)
    {
        throw new System.NotImplementedException();
    }
}
