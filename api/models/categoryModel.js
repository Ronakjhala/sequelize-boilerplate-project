module.exports = (sequelize, Sequelize) => {
    let category = sequelize.define(
      "category",
      {
        categoryName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        categoryType: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
  
    return category;
  };
  