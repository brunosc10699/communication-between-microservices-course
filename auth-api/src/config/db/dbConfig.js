import Sequelize from "sequelize";

const sequelize = new Sequelize("auth-db", "admin", "12Aa3456", {
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
        console.error("Unable to establish a connection to database!");
        console.error(err.message);
    });

export default sequelize;