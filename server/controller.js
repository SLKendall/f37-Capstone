const Sequelize = require(`sequelize`)

require(`dotenv`).config()

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

        DROP TABLE IF EXISTS lists;
        DROP TABLE IF EXISTS movies;

        CREATE TABLE movies (
            id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            url VARCHAR NOT NULL
        );

        CREATE TABLE lists (
            id SERIAL PRIMARY KEY,
            name VARCHAR,
            entry_id INT REFERENCES movies(id)
        );

        INSERT INTO movies (name, url)
        VALUES ('Fantastic Mr. Fox', 'https://image.tmdb.org/t/p/original/jAFvXFcup7pQOyofJlxPr6rcFaa.jpg'),
        ('The Grand Budapest Hotel','https://picfiles.alphacoders.com/137/thumb-1920-137212.jpg'),
        ('Parasite','https://i.imgur.com/HLfqBB0.jpeg'),
        ('Oldboy','https://m.media-amazon.com/images/M/MV5BMTI3NTQyMzU5M15BMl5BanBnXkFtZTcwMTM2MjgyMQ@@._V1_.jpg');

    `).then(() => {
        console.log(`Database seeded`)
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
    },

    createMovie: (req, res) => {

        const{name, url} = req.body

        sequelize.query(`
            INSERT INTO movies
            (name, url)
            VALUES
            ('${name}', '${url}')
            RETURNING *;
        `).then((dbRes) => {
            console.log('createMovie ran successfully')
            res.status(200).send(dbRes[0])
        }).catch((err) => {
            console.log(`Error in createMovie`)
            console.log(err)
            res.status(500).send(err)
        })
    },

    createList: (req, res) => {
        const{name, movie} = req.body

        sequelize.query(`
            INSERT INTO lists
            (name, entry_id)
            VALUES
            ('${name}', ${entry})
            RETURNING *;
        `).then((dbRes) => {
            console.log('createList ran successfully')
            res.status(200).send(dbRes[0])
        }).catch((err) => {
            console.log('Error in createList')
            console.log(err)
            res.status(500).send(err)
        })

    },

    getLists: (req, res) => {

        sequelize.query(`
            SELECT
                movies.id AS movie_id,
                movies.name AS movie,
                url,
                lists.id AS list_id,
                lists.name as list
            FROM movies
            JOIN lists
            ON movies.id = lists.entry_id;
        `).then((dbRes) => {
            console.log('getLists ran succesfully')
            res.status(200).send(dbRes[0])
        }).catch((err) => {
            console.log('Error in getLists')
            console.log(err)
            res.status(500).send(err)
        })
    }

}