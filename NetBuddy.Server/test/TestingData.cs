using Marten;
using Marten.Schema;

namespace NetBuddy.Server.test;

public class TestingData : IInitialData
{
    public async Task Populate(IDocumentStore store, CancellationToken cancellation)
    {
        await using var session = store.LightweightSession();
        session.Store(InitialDataSets.Users);
        await session.SaveChangesAsync(cancellation);
    }
}