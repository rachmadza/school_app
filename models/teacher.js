'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'email format is incorrect'
        },
        isUnique: function (value) {
          let self = this
          return Teacher.findOne({
            where: {
              email: value
            }
          })
            .then(mail => {
              if (mail && mail.id !== self.id) {
                throw new Error(`${value} already in use, please put a new one`);
              }
            })
            .catch(err => {
              throw new Error(err);
            })
        }
      }
    },
    SubjectId: DataTypes.INTEGER
  }, {});

  Teacher.associate = function (models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)

    Teacher.prototype.getFullName = function () {
      return this.first_name + ' ' + this.last_name
    }
  };
  return Teacher;
};