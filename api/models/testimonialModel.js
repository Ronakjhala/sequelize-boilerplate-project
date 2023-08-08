module.exports = (sequelize, Sequelize) => {
    let testimonial = sequelize.define(
      "testimonial",
      {
        testimonialName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
       designation: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        testimonialDescription: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          image: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
  
    return testimonial;
  };
  