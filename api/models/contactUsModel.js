module.exports = (sequelize, Sequelize) => {
    let contactUs = sequelize.define(
      "contactUs",
      {
        contactName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        contactNumber: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        message: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        date: {
          type: Sequelize.DATE, 
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
  
    return contactUs;
  };
  