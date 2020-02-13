# graphql-distribution-experiments
Experiment to create a GraphQL-based gateway that will act as a relay for multiple (possibly remote) servers which have similar schemas.Each server was intended to be a translation layer between whatever DB that it is attached to. The servers are to "massage" the data from the DB into a shape that is standardized before being passed to the gateway upon user request.

TL;DR: The gateway exposes a GraphQL API that can query data from separate database servers as though they are all part of the same database.
