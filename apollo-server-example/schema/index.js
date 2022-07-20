const Apollo = require('apollo-server');
const { gql } = Apollo;
const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Book" type defines the queryable fields for every book in our data source.
    type Book {
        name: String!
        ISBN: String!
        authors: [Author!]!
        publisher: Publisher!
    }

    type Publisher {
        name: String!,
        date: String,
    }

    type Author {
        name: String!,
        nationality: String,
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        HarryPotter: [Book]
    }
`;

const books = [
    {
        name: 'Harry Potter And The Sorcerer\'s Stone',
        publisher: {
            name: 'Bloomsbury Publishing',
            date: '1997/6/26',
        },
        authors: [
            {
                name: 'J.K. Rowling',
                nationality: 'British'
            },
            {
                name: 'Some guy at the cafe',
                nationality: 'British'
            }
        ],
        ISBN: '9789573317241'
    },
    {
        name: 'Harry Potter And The Half-blood Prince',
        publisher: {
            name: 'Bloomsbury Publishing',
            date: '2007/7/21',
        },
        authors: [
            {
                name: 'J.K. Rowling',
                nationality: 'British'
            }
        ],
        ISBN: '9780545582995'
    },
];

const resolvers = {
    Query: {
        HarryPotter: () => books,
    },
};

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers,
};