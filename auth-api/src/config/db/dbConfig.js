import { host } from "pg/lib/defaults";
import { Sequelize} from "sequelize";

const sequelize = new Sequelize("auth-db", "postgres", "", {
    host: "localhost",
    dialect: "postgres",
    quoteIdentifiers: false,
    define: {
        syncOnAssociation: true,
        timestamps: false,
        underscored: true,
        underscoredAll: true,
        freezeTableName: true
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.info("Connection has been established!");
    })
    .catch((err) => {
        console.error("Unable to establish a connection!");
        console.error(err.message);
    });

export default sequelize;