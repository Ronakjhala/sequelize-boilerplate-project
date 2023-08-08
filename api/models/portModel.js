module.exports = (sequelize, DataTypes) => {
    let Port = sequelize.define(
      "Port",
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        gender: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
  
    return Port;
  };
  