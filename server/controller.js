require(`dotenv`).config()

const Sequelize = require(`sequelize`)
const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  })


module.exports = {
    seed: (req, res) => {
        sequelize.query(`

        create table movies (
            movie_id SERIAL PRIMARYKEY,
            name VARCHAR NOT NULL,
            url VARCHAR NOT NULL
        )

        create table lists (
            list_id SERIAL PRIMARY KEY
            name VARCHAR NOT NULL,
            movie_id INT REFERENCES movies(movie_id)
        );

        INSERT INTO movies (name, url)
        VALUES ('Fantastic Mr. Fox', 'https://image.tmdb.org/t/p/original/jAFvXFcup7pQOyofJlxPr6rcFaa.jpg'),
        ('The Grand Budapest Hotel','https://picfiles.alphacoders.com/137/thumb-1920-137212.jpg'),
        ('Parasite','https://i.imgur.com/HLfqBB0.jpeg'),
        ('Oldboy','https://m.media-amazon.com/images/M/MV5BMTI3NTQyMzU5M15BMl5BanBnXkFtZTcwMTM2MjgyMQ@@._V1_.jpg');

    `).then(() => {
        consolelog(`Database seeded`)
        res.sendStatus(200)
    }).catch(err => console.log(`error seeding database`, err))
    },

    getMovies: (req, res) => {
        sequelize.query(`
        SELECT * FROM movies;
        `).then((dbRes) => {
            console.log(`getMovies ran successfully`)
            res.status(200).send(dbRes[0])
        }).catch((err) => {
            console.log(`Error in getMovies`)
            console.log(err)
            res.statsu(500).send(err)
        })
    }
}